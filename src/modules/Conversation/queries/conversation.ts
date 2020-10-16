import { queryField, intArg } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';

import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import isAuthorized from '../../../helpers/isAuthorized';

export const conversationQueryField = queryField('conversation', {
    type: 'Conversation',
    args: {
        whereId: intArg({ required: true }),
    },
    resolve: async (_root, args, { prisma, session }) => {
        isAuthorized(session);

        await checkUserHasConvAccess(prisma, session.owner, args.whereId);

        const data = await prisma.conversation.findOne({
            where: { id: args.whereId },
        });

        if (!data) throw new ApolloError('No data!', 'NO_DATA');

        return data;
    },
});
