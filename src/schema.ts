import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { makeSchema, objectType, asNexusMethod } from '@nexus/schema';
import { GraphQLDate } from 'graphql-iso-date';

export const GQLDate = asNexusMethod(GraphQLDate, 'createdAt');

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

        // t.field('me', {
        //     type: 'person',
        //     nullable: true,
        //     resolve: ((parent, args, ctx) => {
        //         return ctx.prisma.person.findMany();
        //     }) as FieldResolver<'Query', 'me' | 'Person'>,
        // });
    },
});

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.crud.createOneMessage();
        t.crud.deleteOneMessage();
        t.crud.updateOneMessage();

        t.crud.createOnePerson();
        t.crud.deleteOnePerson();
        t.crud.updateOnePerson();

        t.crud.createOneConversation();
        t.crud.deleteOneConversation();
        t.crud.updateOneConversation();
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
