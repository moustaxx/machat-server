import { mutationField, intArg, nonNull } from 'nexus';

import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import isAuthorized from '../../../helpers/isAuthorized';

export const markConvAsReadMutationField = mutationField('markConvAsRead', {
    type: 'LastRead',
    args: { conversationId: nonNull(intArg()) },
    resolve: async (_root, args, { prisma, session }) => {
        isAuthorized(session);
        await checkUserHasConvAccess(prisma, session.owner, args.conversationId);

        const data = await prisma.lastRead.upsert({
            create: {
                person: { connect: { id: session.owner.id } },
                conversation: { connect: { id: args.conversationId } },
                lastRead: new Date(),
            },
            update: {
                lastRead: new Date(),
            },
            where: {
                personID_conversationID: {
                    personID: session.owner.id,
                    conversationID: args.conversationId,
                },
            },
        });

        return data;
    },
});
