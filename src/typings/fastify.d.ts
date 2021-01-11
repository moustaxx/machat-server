import 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
    import { IncomingMessage } from 'http';

    type TCookies = Record<string, string>;

    interface FastifyInstance {
        prisma: PrismaClient;
        parseCookie: <C extends TCookies = TCookies>(header?: string) => Partial<C>;
        decryptSession: (sessionId: string, req: IncomingMessage, cb: (() => void)) => void;
    }
}
