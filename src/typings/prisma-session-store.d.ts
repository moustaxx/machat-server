/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/no-empty-function */

declare module '@quixo3/prisma-session-store' {
    // eslint-disable-next-line import/no-extraneous-dependencies
    import { PrismaClient } from '@prisma/client';
    import FastifySessionPlugin from 'fastify-session';

    type TOptions = {
        checkPeriod?: number;
        ttl?: number;
        dispose?: () => void;
        noDisposeOnSet?: void;
        stale?: boolean;

        dbRecordIdIsSessionId?: boolean;
        dbRecordIdFunction?: null;
        serializer?: {
            stringify: typeof JSON.stringify,
            parse: typeof JSON.parse,
        };

    };

    declare class Store extends FastifySessionPlugin.Store {
        constructor(prisma: PrismaClient, options?: TOptions) {}
    }

    declare function PrismaSessionStore(session: typeof FastifySessionPlugin): typeof Store;

    export default PrismaSessionStore;
}
