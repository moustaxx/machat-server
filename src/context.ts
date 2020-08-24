import { FastifyRequest, FastifyReply } from 'fastify';

import { ISession } from './types';
import prisma, { TPrisma } from './prismaClient';

export interface Context {
    req: FastifyRequest;
    reply: FastifyReply;
    prisma: TPrisma;
    session?: ISession;
}

export async function createContext(req: FastifyRequest, reply: FastifyReply): Promise<Context> {
    return {
        req,
        reply,
        prisma,
        session: req.session,
    };
}
