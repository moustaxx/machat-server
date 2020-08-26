import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient, GQLResponse } from 'fastify-gql-integration-testing';
import { randomBytes } from 'crypto';

import main from '../../../..';
import { NexusGenRootTypes } from '../../../../generated/nexus';
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

it('should return conversation', async () => {
    const { cookies, user } = await createRandomUserAndLogin(app, client);

    const conversation = await client.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
            participants: { connect: { id: user.id } },
        },
    });

    const conversationRes = await gqlRequest(app, {
        cookies,
        query: `
            query conversation($whereId: Int!) {
                conversation(whereId: $whereId) {
                    id
                }
            }
        `,
        variables: { whereId: conversation.id },
    });

    type TData = GQLResponse<{ conversation: NexusGenRootTypes['Conversation'] }>;
    const { data }: TData = await conversationRes.json();

    expect(data.conversation.id).toBeTruthy();
});

it('should throw FORBIDDEN error when not permitted', async () => {
    const { cookies } = await createRandomUserAndLogin(app, client);

    const conversation = await client.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const data = await testClient.query(`
        query conversation($whereId: Int!) {
            conversation(whereId: $whereId) {
                id
            }
        }
    `, {
        cookies,
        variables: { whereId: conversation.id },
    });

    const errorCode = data.errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});

it('should throw error when not authorized', async () => {
    const conversation = await client.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const data = await testClient.query(`
        query conversation($whereId: Int!) {
            conversation(whereId: $whereId) {
                id
            }
        }
    `, {
        variables: { whereId: conversation.id },
    });

    const errorCode = data.errors?.[0].extensions?.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});
