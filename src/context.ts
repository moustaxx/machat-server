// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ISession } from './types';

export const prisma = new PrismaClient();

export interface Context {
    req: FastifyRequest;
    reply: FastifyReply;
    prisma: typeof prisma;
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
