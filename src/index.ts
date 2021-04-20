import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifySession, { Session } from 'fastify-secure-session';
import mercurius from 'mercurius';
import dotenv from 'dotenv';
import { IncomingMessage } from 'node:http';
import 'reflect-metadata';

import { createSchema } from './schema';
import { createContext } from './context';
import prisma from './prismaClient';
import { pubsub } from './PubSub';
import PersonActiveStatus from './PersonActiveStatus';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const main = async (testing?: boolean): Promise<FastifyInstance> => {
    const app = fastify({ logger: isProduction });
    const personActiveStatus = new PersonActiveStatus();

    await app.register(fastifyCors, {
        credentials: true,
        origin: true,
        maxAge: 24 * 3600, // 24hrs
        methods: ['GET', 'POST', 'OPTIONS'],
    });

    if (!process.env.SESSION_SECRET) throw Error('Session secret must be provided!');
    if (!process.env.COOKIE_TTL) throw Error('Cookie TTL env must be provided!');
    const COOKIE_TTL = parseInt(process.env.COOKIE_TTL, 10);

    await app.register(fastifySession, {
        salt: 'mq9hDxBVs231dasD',
        secret: process.env.SESSION_SECRET,
        cookie: {
            secure: isProduction,
            maxAge: COOKIE_TTL,
        },
    });

    app.addHook('onSend', async (req, reply) => {
        type TReq = Omit<typeof req, 'session' | 'cookies'> & {
            session?: typeof req.session;
            cookies: { [cookieName: string]: string | undefined };
        };
        const { session, cookies } = req as TReq;
        if (!session) return;

        const isLoggedIn = session.get('clientID') ? '1' : '0';

        if (cookies.loggedIn !== isLoggedIn) {
            await reply.setCookie('loggedIn', isLoggedIn, { maxAge: COOKIE_TTL });
        }
    });

    app.addHook('onClose', async () => {
        await prisma.$disconnect();
        personActiveStatus.clearSchedule();
    });

    await app.register(mercurius, {
        schema: await createSchema,
        graphiql: 'playground',
        subscription: {
            pubsub,
            verifyClient(info, next) {
                const { req } = info as { req: IncomingMessage & { session?: Session } };
                if (!req.headers.cookie) return next(false);

                const { session } = app.parseCookie<{ session: string }>(req.headers.cookie);

                const decodedSession = (session && app.decodeSecureSession(session))
                    || app.createSecureSession();

                req.session = decodedSession;
                next(true);
            },
            context: (_con, req) => createContext(req, null as any, { personActiveStatus }),
        },
        context: (req, reply) => createContext(req, reply, { personActiveStatus }),
    });

    app.decorate('prisma', prisma);

    if (!testing) {
        await app.listen(4000);
        console.log('🚀 Server ready at: http://localhost:4000/graphql');
    }

    return app;
};

export default main;
