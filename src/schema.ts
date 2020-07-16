import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { makeSchema, objectType, asNexusMethod, stringArg } from '@nexus/schema';
import { GraphQLDate } from 'graphql-iso-date';
import { randomBytes, scryptSync } from 'crypto';
import { ValidationError } from 'apollo-server-fastify';

export const GQLDate = asNexusMethod(GraphQLDate, 'createdAt');

const getHash = (password: string, salt: string) => {
    return scryptSync(password, salt, 32).toString('hex');
};

const Person = objectType({
    name: 'Person',
    definition(t) {
        t.model.id();
        t.model.username();
        t.model.email();
        t.model.isActive();
        t.model.createdAt();
        t.model.lastSeen();
    },
});

const Conversation = objectType({
    name: 'Conversation',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.message();
        t.model.createdAt();
    },
});

const Message = objectType({
    name: 'Message',
    definition(t) {
        t.model.id();
        t.model.content();
        t.model.conversation();
        t.model.conversationID();
        t.model.createdAt();
    },
});

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.person();
        t.crud.people();
        t.crud.conversation();
        t.crud.conversations();
        t.crud.message();
        t.crud.messages();

        t.field('login', {
            type: 'Person',
            args: {
                username: stringArg({ required: true }),
                password: stringArg({ required: true }),
            },
            resolve: async (_, { username, password }, ctx) => {
                const data = await ctx.prisma.person.findOne({
                    where: {
                        username,
                    },
                });

                if (!data) throw new ValidationError('Wrong username or password!');

                const hashFromInput = getHash(password, data.salt);
                const isValid = data.hash === hashFromInput;

                if (!isValid) throw new ValidationError('Wrong username or password!');
                return data;
            },
        });
    },
});

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.crud.createOneMessage();
        t.crud.deleteOneMessage();
        t.crud.updateOneMessage();

        t.crud.deleteOnePerson();

        t.crud.createOneConversation();
        t.crud.deleteOneConversation();
        t.crud.updateOneConversation();

        t.field('register', {
            type: 'Person',
            args: {
                email: stringArg({ required: true }),
                username: stringArg({ required: true }),
                password: stringArg({ required: true }),
            },
            resolve: (_, { email, username, password }, ctx) => {
                const salt = randomBytes(16).toString('hex');
                const hash = getHash(password, salt);

                return ctx.prisma.person.create({
                    data: {
                        email,
                        username,
                        salt,
                        hash,
                    },
                });
            },
        });
    },
});

export const schema = makeSchema({
    types: [Query, Mutation, Person, Conversation, Message],
    plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
    outputs: {
        schema: `${__dirname}/../schema.graphql`,
        typegen: `${__dirname}/generated/nexus.ts`,
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('./context'),
                alias: 'Context',
            },
        ],
    },
});
