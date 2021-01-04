import { queryField, intArg, nonNull } from 'nexus';
import { ApolloError } from 'apollo-server-errors';

import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import isAuthorized from '../../../helpers/isAuthorized';

export const conversationQueryField = queryField('conversation', {
    type: 'Conversation',
    args: {
        whereId: nonNull(intArg()),
    },
    resolve: async (_root, args, { prisma, session }) => {
        isAuthorized(session);

        await checkUserHasConvAccess(prisma, session.owner, args.whereId);

        const data = await prisma.conversation.findUnique({
            where: { id: args.whereId },
        });

        if (!data) throw new ApolloError('No data!', 'NO_DATA');

        return data;
    },
});
