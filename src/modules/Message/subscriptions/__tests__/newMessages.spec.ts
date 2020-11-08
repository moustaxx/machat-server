import { promisify } from 'util';
import { Message } from '@prisma/client';
import { SubscriptionContext } from 'mercurius/lib/subscriber';

import { Context } from '../../../../context';
import { schema } from '../../../../schema';
import prisma from '../../../../prismaClient';
import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import { ISession } from '../../../../types';
import randomString from '../../../../tests/helpers/randomString';

const setTimeoutPromise = promisify(setTimeout);

type TArgs = {
    conversationId: number;
};

type TSubscribe = (
    root: any,
    args: TArgs,
    ctx: Omit<Context, 'req' | 'reply' | 'app'>,
) => Promise<AsyncGenerator<Message, Message>>;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { newMessages } = schema.getSubscriptionType()!.getFields();
const subscribe: TSubscribe = newMessages.subscribe as any;

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
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

    const { pubsub } = t.app.graphql;
    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            session: {
                isLoggedIn: true,
                owner: user,
            } as ISession,
        },
    );

    const yieldedResult = subscription.next();
    await setTimeoutPromise(100); // wait for iterator settle

    const payload: Partial<Message> = {
        conversationID: conversation.id,
    };
    await pubsub.publish({ topic: 'NEW_MESSAGES', payload });

    const { value } = await yieldedResult;
    expect(value).toEqual(payload);
});


it('should throw UNAUTHORIZED on subscription init when not logged in', async () => {
    const { user } = await t.createRandomUser();
    const conversation = await createConversation(user.id);

    const { pubsub } = t.app.graphql;

    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            session: {
                isLoggedIn: false,
            } as ISession,
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

    const { pubsub } = t.app.graphql;

    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            session: {
                isLoggedIn: true,
                owner,
            } as ISession,
        },
    );

    await expect(subscription.next()).rejects.toThrow('Insufficient permissions');
});

it('should not yield after auth rights change', async () => {
    const { user } = await t.createRandomUser();
    const conversation = await createConversation(user.id);

    const { pubsub } = t.app.graphql;
    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            session: {
                isLoggedIn: true,
                owner: user,
            } as ISession,
        },
    );

    const yieldedResult1 = subscription.next();
    await setTimeoutPromise(100); // wait for iterator settle

    const payload: Partial<Message> = {
        conversationID: conversation.id,
    };
    await pubsub.publish({ topic: 'NEW_MESSAGES', payload });

    const { value } = await yieldedResult1;
    expect(value).toEqual(payload);

    await prisma.conversation.update({
        where: { id: conversation.id },
        data: { participants: { disconnect: { id: user.id } } },
    });

    const pendingSubscription = subscription.next();
    await setTimeoutPromise(100); // wait for iterator settle

    await pubsub.publish({ topic: 'NEW_MESSAGES', payload });

    const yieldedResult2 = await Promise.race([pendingSubscription, setTimeoutPromise(1000)]);
    expect(yieldedResult2).toEqual(undefined);
});

it('should not yield when wrong args', async () => {
    const { user } = await t.createRandomUser();
    const conversation = await createConversation(user.id);

    const { pubsub } = t.app.graphql;
    const subscription = await subscribe(
        {},
        { conversationId: conversation.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            session: {
                isLoggedIn: true,
                owner: user,
            } as ISession,
        },
    );

    const pendingSubscription = subscription.next();
    await setTimeoutPromise(100); // wait for iterator settle

    const payload: Partial<Message> = {
        conversationID: 999,
    };

    await pubsub.publish({ topic: 'NEW_MESSAGES', payload });

    const yieldResult = await Promise.race([pendingSubscription, setTimeoutPromise(1000)]);
    expect(yieldResult).toEqual(undefined);
});
