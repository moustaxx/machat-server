import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';

import main from '../../../..';
import { NexusGenRootTypes } from '../../../../generated/nexus';
import { createRandomUser } from '../../../../tests/helpers';

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
        variables: {
            username,
            password,
        },
    });

    expect(data.login.id).toEqual(user.id);
});
