import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import {
    createRandomUserAndLogin,
    createRandomUser,
    initTestServer,
    closeTestServer,
    TGqlQuery,
} from '../../../../tests/helpers';

let prisma: PrismaClient;
let app: FastifyInstance;
let gqlQuery: TGqlQuery;

beforeAll(async () => {
    const testing = await initTestServer();
    app = testing.app;
    prisma = testing.app.prisma;
    gqlQuery = testing.gqlQuery;
});

afterAll(async () => {
    await closeTestServer(app);
});

const queryString = `
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
        }
    }
`;

it('should log in', async () => {
    const { cookiesArray } = await createRandomUserAndLogin(app);
    const loggedIn = cookiesArray.find((cookie) => cookie.name === 'loggedIn');

    expect(loggedIn?.value).toEqual('1');
});

it('should throw error when already logged in', async () => {
    const { username, password, cookies } = await createRandomUserAndLogin(app);

    const { errors } = await gqlQuery({
        query: queryString,
        cookies,
        variables: { username, password },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('ALREADY_LOGGED_IN');
});

it('should throw error when wrong password', async () => {
    const { username } = await createRandomUser(prisma);

    const { errors } = await gqlQuery({
        query: queryString,
        variables: { username, password: 'wrong_password' },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('GRAPHQL_VALIDATION_FAILED');
});
