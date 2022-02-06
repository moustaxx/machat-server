import 'fastify';
import { PrismaClient } from 'prisma-machat';

declare module 'fastify' {
    type TCookies = Record<string, string>;

    interface FastifyInstance {
        prisma: PrismaClient;
        parseCookie: <C extends TCookies = TCookies>(header?: string) => Partial<C>;
    }
}
