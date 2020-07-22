// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';

export const prisma = new PrismaClient();

type TRequest = FastifyRequest<any, any, any, any>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createContext(req: TRequest) {
    return {
        prisma,
        session: req.session,
    };
}

export type Context = ReturnType<typeof createContext>;
