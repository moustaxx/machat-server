import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { SubscriptionContext } from 'mercurius/lib/subscriber';

import { ISession } from './types';
import prisma, { TPrisma } from './prismaClient';
import PersonActiveStatus from './PersonActiveStatus';
import PubSub from './PubSub';

type AuthorizedSession = ISession & Pick<Required<ISession>, 'owner'>;

interface TMyContext<IsAuthorized = false> {
    req: FastifyRequest;
    reply: FastifyReply;
    prisma: TPrisma;
    session: IsAuthorized extends true ? AuthorizedSession : ISession | undefined;
    personActiveStatus: PersonActiveStatus;
}

export interface Context<IsAuthorized = false> extends TMyContext<IsAuthorized> {
    app: FastifyInstance;
    pubsub: PubSub;
}

export interface WSContext<IsAuthorized = false> extends Omit<TMyContext<IsAuthorized>, 'reply'> {
    pubsub: SubscriptionContext;
    /** Fix type when needed */
    lruGatewayResolvers: any;
    reply: {
        request: { headers: {} };
    };
}

export function createContext(
    req: FastifyRequest,
    reply: FastifyReply,
    options: {
        personActiveStatus: PersonActiveStatus;
    },
): TMyContext {
    const { personActiveStatus } = options;
    const session = req.session as ISession;
    const ownerID = session.owner?.id;
    if (ownerID) personActiveStatus.set(ownerID, true);

    return {
        req,
        reply,
        prisma,
        session,
        personActiveStatus,
    };
}
