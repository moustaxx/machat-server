import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import fastifySession from 'fastify-session';
import AltairFastify from 'altair-fastify-plugin';
import pgSession from 'connect-pg-simple';
import mercurius from 'mercurius';
import dotenv from 'dotenv';

import { schema } from './schema';
import { ISession } from './types';
import { createContext } from './context';
import prisma from './prismaClient';
import { pubsub } from './PubSub';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const main = async (testing?: boolean): Promise<FastifyInstance> => {
    const app = fastify({ logger: isProduction });

    await app.register(fastifyCors, {
        credentials: true,
        origin: true,
        maxAge: 24 * 3600, // 24hrs
        methods: ['GET', 'POST'],
    });

    await app.register(fastifyCookie);

    if (!process.env.SESSION_SECRET) throw Error('Session secret must be provided!');

    await app.register(fastifySession, {
        store: testing ? undefined : new (pgSession(fastifySession as any))({
            tableName: 'Session',
            conObject: {
                connectionString: process.env.DATABASE_URL,
                ssl: { rejectUnauthorized: isProduction },
            },
        }),
        cookie: {
            secure: isProduction,
            maxAge: 15552000000, // 6 months
        },
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
    });

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

    app.addHook('onClose', async () => {
        await prisma.$disconnect();
    });

    await app.register(mercurius, {
        schema,
        subscription: {
            pubsub,
            verifyClient({ req }, next) {
                const { sessionId } = app.parseCookie<{ sessionId: string }>(req.headers.cookie);

                if (sessionId) app.decryptSession(sessionId, req, () => next(true));
                else next(false);
            },
            context: (_con, req) => createContext(req, null as any),
        },
        context: createContext,
    });

    app.decorate('prisma', prisma);

    if (!isProduction) app.register(AltairFastify);

    if (!testing) {
        await app.listen(4000);
        console.log('🚀 Server ready at: http://localhost:4000/graphql');
    }

    return app;
};

export default main;
