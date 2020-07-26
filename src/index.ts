import fastify, { FastifyRequest } from 'fastify';
import fastifyGQL from 'fastify-gql';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import fastifySession from 'fastify-session';
import pgSession from 'connect-pg-simple';
import dotenv from 'dotenv';

import { schema } from './schema';
import { createContext } from './context';

dotenv.config();

interface ISession {
    sessionId: string;
    encryptedSessionId: string;
    /** Updates the `expires` property of the session. */
    touch(): void;
    /** Regenerates the session by generating a new `sessionId`. */
    regenerate(): void;

    isLoggedIn?: boolean;
    expires: Date;
}

const sessionOptions = {
    store: new (pgSession(fastifySession as any))({
        conObject: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: process.env.NODE_ENV !== 'development' },
        },
    }),
    cookie: {
        secure: false,
        maxAge: 15552000000, // 6 months
    },
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
};

const main = async () => {
    const app = fastify();

    await app.register(fastifyCors, {
        credentials: true,
        origin: true,
        maxAge: 24 * 3600, // 24hrs
        methods: ['GET', 'POST'],
    });

    await app.register(fastifyCookie);

    await app.register(fastifySession as any, sessionOptions);

    app.addHook('onSend', async (req: FastifyRequest<any, any, any, any>, reply) => {
        const { session, cookies } = req;

        const { isLoggedIn, expires } = session as ISession;
        const loggedInCookie = cookies.loggedIn === '1';

        if (isLoggedIn !== loggedInCookie) {
            await reply.setCookie('loggedIn', isLoggedIn ? '1' : '0', { expires });
        }
    });

    await app.register(fastifyGQL, {
        schema,
        graphiql: 'playground',
        context: createContext,
    });
    await app.listen(4000);
    console.log('🚀 Server ready at: http://localhost:4000/graphql');
};

main();
