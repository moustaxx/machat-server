// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

export const prisma = new PrismaClient();

type TRequest = FastifyRequest<any, any, any, any>;

export interface Context {
    req: TRequest;
    reply: FastifyReply;
    prisma: typeof prisma;
    session: TRequest['session'];
}

export async function createContext(req: TRequest, reply: FastifyReply): Promise<Context> {
    return {
        req,
        reply,
        prisma,
        session: req.session,
    };
}
