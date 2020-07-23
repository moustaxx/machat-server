import fastify from 'fastify';
import fastifyGQL from 'fastify-gql';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import fastifySession from 'fastify-session';
import pgSession from 'connect-pg-simple';
import dotenv from 'dotenv';

import { schema } from './schema';
import { createContext } from './context';

dotenv.config();

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

    await app.register(fastifyGQL, {
        schema,
        graphiql: 'playground',
        context: createContext,
    });
    await app.listen(4000);
    console.log('🚀 Server ready at: http://localhost:4000/graphql');
};

main();
