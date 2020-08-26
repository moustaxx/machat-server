import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';

import main from '../../../..';
import { gqlRequest, createRandomUserAndLogin } from '../../../../tests/helpers';

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

const queryString = `
    query logout {
        logout {
            id
        }
    }
`;

it('should log out', async () => {
    const { user, cookies } = await createRandomUserAndLogin(app, client);

    const logoutRes = await gqlRequest(app, {
        query: queryString,
        cookies,
    });

    const cookiesAfterLogout = logoutRes.cookies;
    const loggedIn = cookiesAfterLogout.find((cookie) => cookie.name === 'loggedIn');

    const logoutJson = await logoutRes.json();

    expect(loggedIn?.value).toEqual('0');
    expect(logoutJson.data.logout.id).toBe(user.id);
});

it('should throw error if not logged in try to log out', async () => {
    const { errors } = await testClient.query(queryString);

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});
