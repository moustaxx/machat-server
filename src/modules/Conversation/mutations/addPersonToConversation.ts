import { mutationField, intArg } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';
import checkIsConvParticipated from '../../../helpers/checkIsConvParticipated';

export const addPersonToConversationMutationField = mutationField('addPersonToConversation', {
    type: 'Conversation',
    args: {
        personId: intArg({ required: true }),
        conversationId: intArg({ required: true }),
    },
    resolve: async (_root, args, { prisma, session }) => {
        if (!session?.isLoggedIn || !session.owner) {
            throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
        }

        await checkIsConvParticipated(prisma, session.owner, args.conversationId);

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
