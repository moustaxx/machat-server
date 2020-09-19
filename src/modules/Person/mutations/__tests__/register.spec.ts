// import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';
import { randomBytes } from 'crypto';

import { gqlRequest, createRandomUserAndLogin, initTestServer, closeTestServer } from '../../../../tests/helpers';

// let prisma: PrismaClient;
let app: FastifyInstance;
let testClient: ReturnType<typeof createFastifyGQLTestClient>;

beforeAll(async () => {
    const testing = await initTestServer();
    app = testing.app;
    // prisma = testing.app.prisma;
    testClient = testing.testClient;
});

afterAll(async () => {
    await closeTestServer(app);
});

const queryString = `
    mutation register($email: String!, $username: String!, $password: String!) {
        register(email: $email, username: $username, password: $password) {
            id
        }
    }
`;

it('should register', async () => {
    const username = randomBytes(5).toString('hex');
    const password = randomBytes(9).toString('hex');
    const email = `${username}@machat.ru`;

    const logoutRes = await gqlRequest(app, {
        query: queryString,
        variables: { email, username, password },
    });

    const loggedIn = logoutRes.cookies.find((cookie) => cookie.name === 'loggedIn');

    const logoutJson = await logoutRes.json();

    expect(loggedIn?.value).toEqual('1');
    expect(logoutJson.data.register.id).toBeTruthy();
});

it('should throw error when already logged in', async () => {
    const { username, password, user, cookies } = await createRandomUserAndLogin(app);

    const { errors } = await testClient.mutate(queryString, {
        cookies,
        variables: { username, password, email: user.email },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('ALREADY_LOGGED_IN');
});
