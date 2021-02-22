import { SubscriptionContext } from 'mercurius/lib/subscriber';
import { GraphQLSchema } from 'graphql';
import 'reflect-metadata';

import { WSContext } from '../../../../context';
import { createSchema } from '../../../../schema';
import prisma from '../../../../prismaClient';
import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import { ISession } from '../../../../types';
import PersonActiveStatus, { TPersonActiveStatusEvent } from '../../../../PersonActiveStatus';
import PubSub from '../../../../PubSub';

type TSubscribe = (
    root: any,
    args: {
        userId: number;
    },
    ctx: Pick<WSContext, 'prisma' | 'pubsub' | 'personActiveStatus' | 'session'>,
) => Promise<AsyncGenerator<Date, Date>>;

let schema: GraphQLSchema;
let subscribe: TSubscribe;

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
    schema = await createSchema;
    const { personActiveStatus } = schema.getSubscriptionType()!.getFields();
    subscribe = personActiveStatus.subscribe as any;
});

afterAll(async () => {
    await t.closeTestServer();
});

it('should return active: true', async () => {
    const { user } = await t.createRandomUser();

    const pubsub = t.app.graphql.pubsub as any as PubSub;
    const subscription = await subscribe(
        {},
        { userId: user.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            personActiveStatus: new PersonActiveStatus(),
            session: {
                isLoggedIn: true,
                owner: user,
            } as ISession,
        },
    );

    const yieldedResult = subscription.next();

    const payload: TPersonActiveStatusEvent = {
        active: true,
        id: user.id,
    };
    pubsub.publish({ topic: 'PERSON_ACTIVE_STATUS', payload });

    const { value } = await yieldedResult;
    expect(value).toEqual(payload);
});

it('should return active: false', async () => {
    const { user } = await t.createRandomUser();

    const pubsub = t.app.graphql.pubsub as any as PubSub;
    const subscription = await subscribe(
        {},
        { userId: user.id },
        {
            prisma,
            pubsub: new SubscriptionContext({ pubsub }),
            personActiveStatus: new PersonActiveStatus(),
            session: {
                isLoggedIn: true,
                owner: user,
            } as ISession,
        },
    );

    const yieldedResult = subscription.next();

    const payload: TPersonActiveStatusEvent = {
        active: false,
        id: user.id,
    };
    pubsub.publish({ topic: 'PERSON_ACTIVE_STATUS', payload });

    const { value } = await yieldedResult;
    expect(value).toEqual(payload);
});

it('should throw UNAUTHORIZED on subscription init when not logged in', async () => {
    const { user } = await t.createRandomUser();

    const pubsub = t.app.graphql.pubsub as any as PubSub;

    const subscription = await subscribe(
        {},
        { userId: user.id },
        {
            prisma,
            personActiveStatus: new PersonActiveStatus(),
            pubsub: new SubscriptionContext({ pubsub }),
            session: {
                isLoggedIn: false,
            } as ISession,
        },
    );

    await expect(subscription.next()).rejects.toThrow('You must be logged in!');
});
