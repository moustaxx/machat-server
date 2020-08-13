import { objectType, mutationField, intArg } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';

// eslint-disable-next-line import/prefer-default-export
export const Conversation = objectType({
    name: 'Conversation',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.messages();
        t.model.createdAt();
        t.model.participants();
    },
});

export const addPersonToConversationMutationField = mutationField('addPersonToConversation', {
    type: 'Conversation',
    args: {
        personId: intArg({ required: true }),
        conversationId: intArg({ required: true }),
    },
    resolve: async (_root, args, { prisma, session }) => {
        if (!session || !session.isLoggedIn || !session.owner) {
            throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
        }

        const data = await prisma.conversation.update({
            where: { id: args.conversationId },
            data: {
                participants: {
                    connect: { id: args.personId },
                },
            },
        });

        if (!data) throw new ApolloError('No data!', 'NO_DATA');

        return data;
    },
});

export const removePersonFromConversationMutationField = mutationField(
    'removePersonFromConversation', {
        type: 'Conversation',
        args: {
            personId: intArg({ required: true }),
            conversationId: intArg({ required: true }),
        },
        resolve: async (_root, args, { prisma, session }) => {
            if (!session || !session.isLoggedIn || !session.owner) {
                throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
            }

            const data = await prisma.conversation.update({
                where: { id: args.conversationId },
                data: {
                    participants: {
                        disconnect: { id: args.personId },
                    },
                },
            });

            if (!data) throw new ApolloError('No data!', 'NO_DATA');

            return data;
        },
    },
);
