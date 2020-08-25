import { queryField, intArg } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';
import checkIsConvParticipated from '../../../helpers/checkIsConvParticipated';

export const conversationQueryField = queryField('conversation', {
    type: 'Conversation',
    args: {
        whereId: intArg({ required: true }),
    },
    resolve: async (_root, args, { prisma, session }) => {
        if (!session?.isLoggedIn) {
            throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
        }

        await checkIsConvParticipated(prisma, session.owner, args.whereId);

        const data = await prisma.conversation.findOne({
            where: { id: args.whereId },
        });

        if (!data) throw new ApolloError('No data!', 'NO_DATA');

        return data;
    },
});
