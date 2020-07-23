// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';

export const prisma = new PrismaClient();

type TRequest = FastifyRequest<any, any, any, any>;

export interface Context {
    prisma: typeof prisma;
    session: TRequest['session'];
}

export async function createContext(req: TRequest): Promise<Context> {
    return {
        prisma,
        session: req.session,
    };
}
