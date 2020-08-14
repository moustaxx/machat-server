import { objectType, mutationField, intArg } from '@nexus/schema';
import { ApolloError, ForbiddenError } from 'apollo-server-errors';
import { Context } from '../context';

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

export const checkIsConvParticipated = async (
    prisma: Context['prisma'],
    sessionOwner: NonNullable<Context['session']>['owner'],
    conversationId: number,
): Promise<boolean> => {
    const getConv = await prisma.person.findOne({
        select: {
            conversations: {
                select: {
                    id: true,
                },
            },
        },
        where: { id: sessionOwner?.id },
    });
    const isParticipated = getConv?.conversations.find((conv) => {
        return conv.id === conversationId;
    });
    return !!isParticipated;
};

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

        const isParticipated = await checkIsConvParticipated(
            prisma,
            session.owner,
            args.conversationId,
        );
        if (!isParticipated) throw new ForbiddenError('Forbidden Access');

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

            const isParticipated = await checkIsConvParticipated(
                prisma,
                session.owner,
                args.conversationId,
            );
            if (!isParticipated) throw new ForbiddenError('Forbidden Access');

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
