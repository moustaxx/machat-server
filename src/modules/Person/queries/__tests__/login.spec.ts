import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient, GQLResponse } from 'fastify-gql-integration-testing';

import main from '../../../..';
import { createRandomUser, gqlRequest } from '../../../../tests/helpers';
import { NexusGenRootTypes } from '../../../../generated/nexus';

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

    const { cookies } = loginRes;
    const loggedIn = cookies.find((cookie) => cookie.name === 'loggedIn');

    type TLoginJson = GQLResponse<{ login: NexusGenRootTypes['Person'] }>;
    const loginJson: TLoginJson = await loginRes.json();

    expect(loggedIn?.value).toEqual('1');
    expect(loginJson.data.login.id).toEqual(user.id);
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
