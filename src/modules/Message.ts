import { objectType, mutationField, intArg, stringArg } from '@nexus/schema';
import { ApolloError, UserInputError, ForbiddenError } from 'apollo-server-errors';

// eslint-disable-next-line import/prefer-default-export
export const Message = objectType({
    name: 'Message',
    definition(t) {
        t.model.id();
        t.model.content();
        t.model.conversation();
        t.model.conversationID();
        t.model.authorID();
        t.model.author();
        t.model.createdAt();
    },
});

export const createMessageMutationField = mutationField('createMessage', {
    type: 'Message',
    args: {
        content: stringArg({ required: true }),
        conversationId: intArg({ required: true }),
    },
    resolve: async (_root, args, { prisma, session }) => {
        if (!session || !session.isLoggedIn || !session.owner) {
            throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
        }

        if (args.content.length < 1) throw new UserInputError('Message cannot be empty!');

        const getConv = await prisma.person.findOne({
            select: {
                conversations: {
                    select: {
                        id: true,
                    },
                },
            },
            where: { id: session.owner.id },
        });
        const isParticipated = getConv?.conversations.find((conv) => {
            return conv.id === args.conversationId;
        });
        if (!isParticipated) {
            throw new ForbiddenError('Forbidden Access');
        }

        const data = await prisma.message.create({
            data: {
                content: args.content,
                author: {
                    connect: { id: session.owner.id },
                },
                conversation: {
                    connect: { id: args.conversationId },
                },
            },
        });

        if (!data) throw new ApolloError('No data!', 'NO_DATA');

        return data;
    },
});
