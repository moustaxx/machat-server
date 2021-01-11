import { intArg, nonNull, subscriptionField } from 'nexus';
import { Message } from '@prisma/client';
import { withFilter } from 'mercurius';

import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import isAuthorized from '../../../helpers/isAuthorized';
import { WSContext } from '../../../context';

export const newMessages = subscriptionField('newMessages', {
    type: 'Message',
    args: {
        conversationId: nonNull(intArg()),
    },
    resolve: (payload: Message) => payload,
    subscribe: withFilter(
        async (_root, args, ctxFix) => {
            const { prisma, session, pubsub } = ctxFix as any as WSContext;
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
