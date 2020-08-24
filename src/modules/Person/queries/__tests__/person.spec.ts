import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient, GQLResponse } from 'fastify-gql-integration-testing';

import main from '../../../..';
import { NexusGenRootTypes } from '../../../../generated/nexus';
import { gqlRequest, randomUserLogin } from '../../../../tests/helpers';

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

it('should return people list when admin permissions are present d', async () => {
    const { cookies } = await randomUserLogin(app, client, { isAdmin: true });

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
