import fastify from 'fastify';
import fastifyGQL from 'fastify-gql';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import fastifySession from 'fastify-session';
import prismaSessionStore from '@quixo3/prisma-session-store';
import dotenv from 'dotenv';

import { schema } from './schema';
import { createContext, prisma } from './context';

dotenv.config();

const PrismaSessionStore = prismaSessionStore(fastifySession);

const sessionOptions = {
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000, // ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: null,
        },
    ),
    cookie: {
        secure: false,
        maxAge: 15552000000, // 6 months
    },
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
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

    await app.register(fastifyGQL, {
        schema,
        graphiql: 'playground',
        context: createContext,
    });
    await app.listen(4000);
    console.log('🚀 Server ready at: http://localhost:4000/graphql');
};

main();
