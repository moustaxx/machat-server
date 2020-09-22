import { randomBytes } from 'crypto';

import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import { Conversation } from '../../../../../node_modules/.prisma/client';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

const queryString = `
    mutation createMessage($content: String!, $conversationId: Int!) {
        createMessage(content: $content, conversationId: $conversationId) {
            id
        }
    }
`;

it('should create message', async () => {
    const { user, cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
            participants: { connect: { id: user.id } },
        },
    });

    type TData = { createMessage: Conversation };
    const { data } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: {
            content: randomBytes(3).toString('hex'),
            conversationId: conversation.id,
        },
    });

    const messageInDB = await t.prisma.conversation.findOne({
        where: { id: data.createMessage.id },
    });

    expect(messageInDB?.id).toEqual(user.id);
});

it('should throw error when not permitted', async () => {
    const { cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const { errors } = await t.gqlQuery({
        query: queryString,
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
    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: {
            content: randomBytes(3).toString('hex'),
            conversationId: conversation.id,
        },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});

it('should throw error if empty message', async () => {
    const { user, cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
            participants: { connect: { id: user.id } },
        },
    });

    type TData = { createMessage: Conversation };
    const { errors } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: {
            content: '',
            conversationId: conversation.id,
        },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('BAD_USER_INPUT');
});
