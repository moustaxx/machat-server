import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';
import { randomBytes } from 'crypto';

import main from '../../../..';
import { getHash } from '../../helpers/getHash';
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
    const username = randomBytes(5).toString('hex');
    const password = randomBytes(9).toString('hex');

    const salt = randomBytes(16).toString('hex');
    const hash = getHash(password, salt);

    const user = await client.person.create({
        data: {
            email: `${username}@machat.ru`,
            username,
            salt,
            hash,
        },
    });

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
