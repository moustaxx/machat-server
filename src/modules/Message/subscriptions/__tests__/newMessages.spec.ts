import { promisify } from 'util';
import { Message } from 'prisma-machat';
import { SubscriptionContext } from 'mercurius/lib/subscriber';
import { GraphQLSchema } from 'graphql';
import 'reflect-metadata';

import { WSContext } from '../../../../context';
import { createSchema } from '../../../../schema';
import prisma from '../../../../prismaClient';
import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import randomString from '../../../../tests/helpers/randomString';
import PubSub from '../../../../PubSub';

const setTimeoutPromise = promisify(setTimeout);

type TArgs = {
    conversationId: number;
};

type TSubscribe = (
    root: any,
    args: TArgs,
    ctx: Pick<WSContext, 'prisma' | 'pubsub' | 'clientID'>,
) => Promise<AsyncGenerator<Message, Message>>;

let schema: GraphQLSchema;
let subscribe: TSubscribe;

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
    schema = await createSchema;
    const { newMessages } = schema.getSubscriptionType()!.getFields();
    subscribe = newMessages.subscribe as any;
});

afterAll(async () => {
    await t.closeTestServer();
});

const createConversation = (participantId: number) => t.prisma.conversation.create({
    data: {
        name: randomString(8),
        participants: { connect: { id: participantId } },
    },
});

it('should work', async () => {
    const { user } = await t.createRandomUser();
    const conversation = await createConversation(user.id);

    const pubsub = t.app.graphql.pubsub as any as PubSub;
    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            clientID: user.id,
        },
    );

    const yieldedResult = subscription.next();
    await setTimeoutPromise(100); // wait for iterator settle

    const payload: Partial<Message> = {
        conversationID: conversation.id,
    };
    pubsub.publish({ topic: 'NEW_MESSAGES', payload });

    const { value } = await yieldedResult;
    expect(value).toEqual(payload);
});


it('should throw UNAUTHORIZED on subscription init when not logged in', async () => {
    const { user } = await t.createRandomUser();
    const conversation = await createConversation(user.id);

    const pubsub = t.app.graphql.pubsub as any as PubSub;

    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            clientID: null,
        },
    );

    await expect(subscription.next()).rejects.toThrow('You must be logged in!');
});

it('should throw FORBIDDEN on subscription init when user has not access to conv', async () => {
    const [
        { user },
        { user: owner },
    ] = await Promise.all([t.createRandomUser(), t.createRandomUser()]);

    const conversation = await createConversation(user.id);

    const pubsub = t.app.graphql.pubsub as any as PubSub;

    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            clientID: owner.id,
        },
    );

    await expect(subscription.next()).rejects.toThrow('Insufficient permissions');
});

it('should not yield after auth rights change', async () => {
    const { user } = await t.createRandomUser();
    const conversation = await createConversation(user.id);

    const pubsub = t.app.graphql.pubsub as any as PubSub;
    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            clientID: user.id,
        },
    );

    const yieldedResult1 = subscription.next();
    await setTimeoutPromise(100); // wait for iterator settle

    const payload: Partial<Message> = {
        conversationID: conversation.id,
    };
    pubsub.publish({ topic: 'NEW_MESSAGES', payload });

    const { value } = await yieldedResult1;
    expect(value).toEqual(payload);

    await prisma.conversation.update({
        where: { id: conversation.id },
        data: { participants: { disconnect: { id: user.id } } },
    });

    const pendingSubscription = subscription.next();
    await setTimeoutPromise(100); // wait for iterator settle

    pubsub.publish({ topic: 'NEW_MESSAGES', payload });

    const yieldedResult2 = await Promise.race([pendingSubscription, setTimeoutPromise(1000)]);
    expect(yieldedResult2).toEqual(undefined);
});

it('should not yield when wrong args', async () => {
    const { user } = await t.createRandomUser();
    const conversation = await createConversation(user.id);

    const pubsub = t.app.graphql.pubsub as any as PubSub;
    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            clientID: user.id,
        },
    );

    const pendingSubscription = subscription.next();
    await setTimeoutPromise(100); // wait for iterator settle

    const payload: Partial<Message> = {
        conversationID: 999,
    };

    pubsub.publish({ topic: 'NEW_MESSAGES', payload });

    const yieldResult = await Promise.race([pendingSubscription, setTimeoutPromise(1000)]);
    expect(yieldResult).toEqual(undefined);
});
