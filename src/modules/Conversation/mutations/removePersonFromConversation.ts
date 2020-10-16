import { mutationField, intArg } from '@nexus/schema';
import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import isAuthorized from '../../../helpers/isAuthorized';

export const removePersonFromConversationMutationField = mutationField(
    'removePersonFromConversation', {
        type: 'Conversation',
        args: {
            personId: intArg({ required: true }),
            conversationId: intArg({ required: true }),
        },
        resolve: async (_root, args, { prisma, session }) => {
            isAuthorized(session);

            await checkUserHasConvAccess(prisma, session.owner, args.conversationId);

            const data = await prisma.conversation.update({
                where: { id: args.conversationId },
                data: {
                    participants: {
                        disconnect: { id: args.personId },
                    },
                },
            });

            return data;
        },
    },
);
