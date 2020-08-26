import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';
import { randomBytes } from 'crypto';

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

it('should register', async () => {
    const username = randomBytes(5).toString('hex');
    const password = randomBytes(9).toString('hex');
    const email = `${username}@machat.ru`;

    const logoutRes = await gqlRequest(app, {
        query: `
            mutation register($email: String!, $username: String!, $password: String!) {
                register(email: $email, username: $username, password: $password) {
                    id
                }
            }
        `,
        variables: { email, username, password },
    });

    const loggedIn = logoutRes.cookies.find((cookie) => cookie.name === 'loggedIn');

    const logoutJson = await logoutRes.json();

    expect(loggedIn?.value).toEqual('1');
    expect(logoutJson.data.register.id).toBeTruthy();
});

it('should throw error when already logged in', async () => {
    const { username, password, user, cookies } = await createRandomUserAndLogin(app, client);

    const { errors } = await testClient.mutate(`
        mutation register($email: String!, $username: String!, $password: String!) {
            register(email: $email, username: $username, password: $password) {
                id
            }
        }
    `, {
        cookies,
        variables: { username, password, email: user.email },
    });

    const errorCode = errors && errors[0].extensions?.code;
    expect(errorCode).toEqual('ALREADY_LOGGED_IN');
});
