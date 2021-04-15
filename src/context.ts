import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { SubscriptionContext } from 'mercurius/lib/subscriber';
import { Session } from 'fastify-secure-session';

import prisma, { TPrisma } from './prismaClient';
import PersonActiveStatus from './PersonActiveStatus';
import PubSub from './PubSub';

interface TMyContext<IsAuthorized = false> {
    req: FastifyRequest;
    reply: FastifyReply;
    prisma: TPrisma;
    session: Session;
    clientID: IsAuthorized extends true ? number : number | null;
    isLoggedIn: boolean;
    isClientAdmin: boolean;
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
    const { session } = req;

    const clientID = session.get('clientID') || null;
    const isClientAdmin = session.get('isClientAdmin') || false;
    if (clientID) personActiveStatus.set(clientID, true);

    return {
        req,
        reply,
        prisma,
        session,
        clientID,
        isClientAdmin,
        isLoggedIn: !!clientID,
        personActiveStatus,
    };
}
