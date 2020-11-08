import { intArg, subscriptionField } from '@nexus/schema';
import { Message } from '@prisma/client';
import { withFilter } from 'mercurius';

import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import isAuthorized from '../../../helpers/isAuthorized';

export const newMessages = subscriptionField('newMessages', {
    type: 'Message',
    args: {
        conversationId: intArg({ required: true }),
    },
    resolve: (payload) => payload,
    subscribe: withFilter(
        async (_root, args, { prisma, session, pubsub }) => {
            isAuthorized(session);
            await checkUserHasConvAccess(prisma, session.owner, args.conversationId);

            return pubsub.subscribe('NEW_MESSAGES');
        },
        async (payload: Message, args, { prisma, session }) => {
            try {
                isAuthorized(session);
                await checkUserHasConvAccess(prisma, session.owner, args.conversationId);
            } catch (error) {
                return false;
            }

            return payload.conversationID === args.conversationId;
        },
    ),
});
