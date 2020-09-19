// import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import {
    gqlRequest,
    createRandomUserAndLogin,
    initTestServer,
    closeTestServer,
    TGqlQuery,
} from '../../../../tests/helpers';

// let prisma: PrismaClient;
let app: FastifyInstance;
let gqlQuery: TGqlQuery;

beforeAll(async () => {
    const testing = await initTestServer();
    app = testing.app;
    // prisma = testing.app.prisma;
    gqlQuery = testing.gqlQuery;
});

afterAll(async () => {
    await closeTestServer(app);
});

const queryString = `
    query logout {
        logout {
            id
        }
    }
`;

it('should log out', async () => {
    const { user, cookies } = await createRandomUserAndLogin(app);

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
    const { errors } = await gqlQuery({ query: queryString });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});
