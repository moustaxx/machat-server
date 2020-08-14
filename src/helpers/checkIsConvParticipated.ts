import { ForbiddenError } from 'apollo-server-errors';

import { Context } from '../context';

const checkIsConvParticipated = async (
    prisma: Context['prisma'],
    sessionOwner: NonNullable<Context['session']>['owner'],
    conversationId: number,
): Promise<void> => {
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

    const isParticipated = !!getConv?.conversations.find((conv) => {
        return conv.id === conversationId;
    });

    if (!sessionOwner?.isAdmin && !isParticipated) {
        throw new ForbiddenError('Insufficient permissions');
    }
};

export default checkIsConvParticipated;
