// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client';
import { NexusGenAllTypes } from './generated/nexus';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

export interface ISession {
    sessionId: string;
    encryptedSessionId: string;
    /** Updates the `expires` property of the session. */
    touch(): void;
    /** Regenerates the session by generating a new `sessionId`. */
    regenerate(): void;

    isLoggedIn?: boolean;
    expires?: Date;
    owner?: NexusGenAllTypes['Person'];
}
