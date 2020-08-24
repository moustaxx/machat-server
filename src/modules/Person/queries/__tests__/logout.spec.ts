import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';

import main from '../../../..';
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

it('should log out', async () => {
    const { username, password, user } = await createRandomUser(client);

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

    const logoutQuery = await testClient.query(`
        query logout {
            logout {
                id
            }
        }
    `, { cookies });

    expect(logoutQuery.data.logout.id).toBe(user.id);
});
