import { SubscriptionContext } from 'mercurius/lib/subscriber';

import { Context } from '../../../../context';
import { schema } from '../../../../schema';
import prisma from '../../../../prismaClient';
import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import { ISession } from '../../../../types';
import PersonActiveStatus, { TPersonActiveStatusEvent } from '../../../../PersonActiveStatus';

type TSubscribe = (
    root: any,
    args: {
        userId: number,
    },
    ctx: Omit<Context, 'req' | 'reply' | 'app'>,
) => Promise<AsyncGenerator<unknown, unknown>>;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { personActiveStatus } = schema.getSubscriptionType()!.getFields();
const subscribe: TSubscribe = personActiveStatus.subscribe as any;

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

it('should return active: true', async () => {
    const { user } = await t.createRandomUser();

    const { pubsub } = t.app.graphql;
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
    await pubsub.publish({ topic: 'PERSON_ACTIVE_STATUS', payload });

    const { value } = await yieldedResult;
    expect(value).toEqual(payload);
});

it('should return active: false', async () => {
    const { user } = await t.createRandomUser();

    const { pubsub } = t.app.graphql;
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
    await pubsub.publish({ topic: 'PERSON_ACTIVE_STATUS', payload });

    const { value } = await yieldedResult;
    expect(value).toEqual(payload);
});

it('should throw UNAUTHORIZED on subscription init when not logged in', async () => {
    const { user } = await t.createRandomUser();

    const { pubsub } = t.app.graphql;

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
