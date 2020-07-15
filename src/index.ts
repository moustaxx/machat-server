import fastify from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';

import { schema } from './schema';
import { context } from './context';

import './generated/nexus';

const main = async () => {
    const app = fastify();
    const server = new ApolloServer({
        schema,
        context,
    });

    app.register(server.createHandler());
    await app.listen(4000);
    console.log('🚀 Server ready at: http://localhost:4000/graphql');
};

main();
