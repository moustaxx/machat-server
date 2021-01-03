import { FastifyRequest, FastifyReply } from 'fastify';
import { MercuriusContext } from 'mercurius';

import { ISession } from './types';
import prisma, { TPrisma } from './prismaClient';
import PersonActiveStatus, { personActiveStatus } from './PersonActiveStatus';

export interface Context extends MercuriusContext {
    req: FastifyRequest;
    /**  Not available inside `subscription` context */
    reply: FastifyReply;
    prisma: TPrisma;
    session?: ISession;
    personActiveStatus: PersonActiveStatus;
}

export async function createContext(
    req: FastifyRequest,
    reply: FastifyReply,
): Promise<Omit<Context, keyof MercuriusContext>> {
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
