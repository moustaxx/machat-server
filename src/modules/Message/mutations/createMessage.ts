import { mutationField, stringArg, intArg } from '@nexus/schema';
import { UserInputError } from 'apollo-server-errors';

import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import isAuthorized from '../../../helpers/isAuthorized';

export const createMessageMutationField = mutationField('createMessage', {
    type: 'Message',
    args: {
        content: stringArg({ required: true }),
        conversationId: intArg({ required: true }),
    },
    resolve: async (_root, args, { prisma, session, pubsub }) => {
        isAuthorized(session);

        const content = args.content.trim();
        if (content.length < 1) throw new UserInputError('Message cannot be empty!');

        await checkUserHasConvAccess(prisma, session.owner, args.conversationId);

        const data = await prisma.message.create({
            data: {
                content,
                author: {
                    connect: { id: session.owner.id },
                },
                conversation: {
                    connect: { id: args.conversationId },
                },
            },
        });

        await pubsub.publish({
            topic: 'NEW_MESSAGES',
            payload: data,
        });

        return data;
    },
});
