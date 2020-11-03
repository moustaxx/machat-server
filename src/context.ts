import { FastifyRequest, FastifyReply } from 'fastify';
import { MercuriusContext } from 'mercurius';

import { ISession } from './types';
import prisma, { TPrisma } from './prismaClient';

export interface Context extends MercuriusContext {
    req: FastifyRequest;
    /**  Not available inside `subscription` context */
    reply: FastifyReply;
    prisma: TPrisma;
    session?: ISession;
}

export async function createContext(
    req: FastifyRequest,
    reply: FastifyReply,
): Promise<Omit<Context, keyof MercuriusContext>> {
    return {
        req,
        reply,
        prisma,
        session: req.session,
    };
}
