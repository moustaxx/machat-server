import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';

import main from '../../../..';
import { NexusGenRootTypes } from '../../../../generated/nexus';
import { createRandomUser, gqlRequest } from '../../../../tests/helpers';

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

it('should log in', async () => {
    const { username, password, user } = await createRandomUser(client);

    const { data } = await testClient.query<{ login: NexusGenRootTypes['Person'] }>(`
        query login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                id
            }
        }
    `, {
        variables: { username, password },
    });

    expect(data.login.id).toEqual(user.id);
});

it('should throw error when already logged in', async () => {
    const { username, password } = await createRandomUser(client);

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

    const { errors } = await testClient.query(`
        query login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                id
            }
        }
    `, {
        cookies,
        variables: { username, password },
    });

    const errorCode = errors && errors[0].extensions?.code;
    expect(errorCode).toEqual('ALREADY_LOGGED_IN');
});
