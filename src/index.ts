import fastify from 'fastify';
import fastifyGQL from 'fastify-gql';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import fastifySession from 'fastify-session';
import pgSession from 'connect-pg-simple';
import dotenv from 'dotenv';

import { schema } from './schema';
import { createContext } from './context';
import { ISession } from './types';

dotenv.config();

if (!process.env.SESSION_SECRET) throw Error('Session secret must be provided!');

const isProduction = process.env.NODE_ENV === 'production';

const sessionOptions = {
    store: new (pgSession(fastifySession as any))({
        conObject: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: isProduction },
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
    const app = fastify({ logger: isProduction });

    await app.register(fastifyCors, {
        credentials: true,
        origin: true,
        maxAge: 24 * 3600, // 24hrs
        methods: ['GET', 'POST'],
    });

    await app.register(fastifyCookie);

    await app.register(fastifySession, sessionOptions);

    app.addHook('onSend', async (req, reply) => {
        const { session, cookies } = req;
        if (!session) return;

        const { isLoggedIn, expires } = session as ISession;
        const isLoggedInCookie = cookies.loggedIn === '1';
        if (cookies.loggedIn === undefined && isLoggedIn === undefined) return;

        if (cookies.loggedIn === undefined || isLoggedIn !== isLoggedInCookie) {
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
