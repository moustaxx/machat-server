import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient, GQLResponse } from 'fastify-gql-integration-testing';
import { randomBytes } from 'crypto';

import main from '../../../..';
import { getHash } from '../../helpers/getHash';
import { NexusGenRootTypes } from '../../../../generated/nexus';
import { gqlRequest } from '../../../../tests/helpers';

let client: PrismaClient;
let app: FastifyInstance;
let testClient: ReturnType<typeof createFastifyGQLTestClient>;

beforeAll(async () => {
    client = new PrismaClient();
    app = await main(true);
    testClient = createFastifyGQLTestClient(app);
});

afterAll(async () => {
    await Promise.allSettled([
        client.$disconnect(),
        app.close(),
    ]);
});

it('should throw FORBIDDEN error when quering people without permissions', async () => {
    const data = await testClient.query(`
        query getPeople {
            people {
                id
            }
        }
    `);

    const errorCode = data.errors && data.errors[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});

it('should return people list when admin permissions are present', async () => {
    const username = randomBytes(5).toString('hex');
    const password = randomBytes(9).toString('hex');

    const salt = randomBytes(16).toString('hex');
    const hash = getHash(password, salt);

    await client.person.create({
        data: {
            email: 'admin@admin.ad',
            username,
            salt,
            hash,
            isAdmin: true,
        },
    });

    const loginRes = await gqlRequest(app, {
        query: `
            query login($username: String!, $password: String!) {
                login(username: $username, password: $password) {
                    id
                }
            }
        `,
        variables: { username, password },
    });

    const dirtyCookies = loginRes.cookies;
    let cookies: Record<string, string> = {};
    dirtyCookies.forEach((cookie) => {
        cookies = { ...cookies, [cookie.name]: cookie.value };
    });

    const peopleRes = await gqlRequest(app, {
        cookies,
        query: `
            query getPeople {
                people {
                    id
                }
            }
        `,
    });

    type TPeopleQuery = GQLResponse<{ people: NexusGenRootTypes['Person'][] }>;
    const { data }: TPeopleQuery = await peopleRes.json();

    expect(data.people.length).toBeGreaterThan(0);
});
