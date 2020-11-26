import { Message } from 'prisma-machat';

import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import randomString from '../../../../tests/helpers/randomString';

let t: ITestUtils;

beforeEach(async () => {
    t = await initTestServer();
});

afterEach(async () => {
    await t.closeTestServer();
});

const queryString = `
    mutation createMessage($content: String!, $conversationId: Int!) {
        createMessage(content: $content, conversationId: $conversationId) {
            id
        }
    }
`;

it('should publish a message', async () => {
    const { user, cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomString(8),
            participants: { connect: { id: user.id } },
        },
    });

    let resolve: undefined | ((msg: Message) => void);
    const waitForPublish = new Promise<Message>((res) => {
        resolve = res;
    });

    await t.app.graphql.pubsub.subscribe('NEW_MESSAGES', {
        push: (value: Message) => {
            if (!resolve) throw Error('Resolve is not defined');
            resolve(value);
        },
    });

    type TCreateMessage = { createMessage: Message };
    const { data } = await t.gqlQuery<TCreateMessage>({
        query: queryString,
        cookies,
        variables: {
            content: randomString(6),
            conversationId: conversation.id,
        },
    });

    expect(resolve).toBeDefined();
    const message = await waitForPublish;
    expect(message.id).toEqual(data.createMessage.id);
});

it('should create message', async () => {
    const { user, cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomString(8),
            participants: { connect: { id: user.id } },
        },
    });

    type TData = { createMessage: Message };
    const { data } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: {
            content: randomString(6),
            conversationId: conversation.id,
        },
    });

    const messageInDB = await t.prisma.conversation.findUnique({
        where: { id: data.createMessage.id },
    });

    expect(messageInDB?.id).toEqual(user.id);
});

it('should throw error when not permitted', async () => {
    const { cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomString(8),
        },
    });

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: {
            content: randomString(6),
            conversationId: conversation.id,
        },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});

it('should throw error if empty message', async () => {
    const { user, cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomString(8),
            participants: { connect: { id: user.id } },
        },
    });

    type TData = { createMessage: Message };
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
