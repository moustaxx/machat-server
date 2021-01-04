import 'fastify';

declare module 'fastify' {
    import { IncomingMessage } from 'http';
    import { PrismaClient } from 'prisma-machat';
    import PersonActiveStatus from '../PersonActiveStatus';

    type TCookies = Record<string, string>;

    interface FastifyInstance {
        prisma: PrismaClient;
        parseCookie: <C extends TCookies = TCookies>(header?: string) => Partial<C>;
        decryptSession: (sessionId: string, req: IncomingMessage, cb: (() => void)) => void;
    }

    interface FastifyRequest {
        personActiveStatus: PersonActiveStatus;
    }
}
