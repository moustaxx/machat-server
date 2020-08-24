import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';

import main from '../../../..';
import { createRandomUser, randomUserLogin } from '../../../../tests/helpers';

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
    const { cookiesArray } = await randomUserLogin(app, client);
    const loggedIn = cookiesArray.find((cookie) => cookie.name === 'loggedIn');

    expect(loggedIn?.value).toEqual('1');
});

it('should throw error when already logged in', async () => {
    const { username, password, cookies } = await randomUserLogin(app, client);

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

it('should throw error when wrong password', async () => {
    const { username } = await createRandomUser(client);

    const { errors } = await testClient.query(`
        query login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                id
            }
        }
    `, {
        variables: { username, password: 'wrong_password' },
    });

    const errorCode = errors && errors[0].extensions?.code;
    expect(errorCode).toEqual('GRAPHQL_VALIDATION_FAILED');
});
