import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';
import { randomBytes } from 'crypto';

import { closeTestServer, createRandomUserAndLogin, initTestServer } from '../../../../tests/helpers';
import { Conversation } from '../../../../../node_modules/.prisma/client';

let prisma: PrismaClient;
let app: FastifyInstance;
let testClient: ReturnType<typeof createFastifyGQLTestClient>;

beforeAll(async () => {
    const testing = await initTestServer();
    app = testing.app;
    prisma = testing.app.prisma;
    testClient = testing.testClient;
});

afterAll(async () => {
    await closeTestServer(app);
});

const queryString = `
    mutation createMessage($content: String!, $conversationId: Int!) {
        createMessage(content: $content, conversationId: $conversationId) {
            id
        }
    }
`;

it('should create message', async () => {
    const { user, cookies } = await createRandomUserAndLogin(app);

    const conversation = await prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
            participants: { connect: { id: user.id } },
        },
    });

    type TData = { createMessage: Conversation };
    const { data } = await testClient.mutate<TData>(queryString, {
        cookies,
        variables: {
            content: randomBytes(3).toString('hex'),
            conversationId: conversation.id,
        },
    });

    const messageInDB = await prisma.conversation.findOne({
        where: { id: data.createMessage.id },
    });

    expect(messageInDB?.id).toBeTruthy();
});

it('should throw error when not permitted', async () => {
    const { cookies } = await createRandomUserAndLogin(app);

    const conversation = await prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const { errors } = await testClient.mutate(queryString, {
        cookies,
        variables: {
            content: randomBytes(3).toString('hex'),
            conversationId: conversation.id,
        },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});

it('should throw error when not authorized', async () => {
    const conversation = await prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const { errors } = await testClient.mutate(queryString, {
        variables: {
            content: randomBytes(3).toString('hex'),
            conversationId: conversation.id,
        },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});

it('should throw error if empty message', async () => {
    const { user, cookies } = await createRandomUserAndLogin(app);

    const conversation = await prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
            participants: { connect: { id: user.id } },
        },
    });

    type TData = { createMessage: Conversation };
    const { errors } = await testClient.mutate<TData>(queryString, {
        cookies,
        variables: {
            content: '',
            conversationId: conversation.id,
        },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('BAD_USER_INPUT');
});
