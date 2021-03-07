import { ForbiddenError } from 'apollo-server-errors';
import { TPrisma } from '../prismaClient';
import { ISession } from '../types';

const throwErrorWhenNoConvAccess = async (
    prisma: TPrisma,
    user: NonNullable<ISession['owner']>,
    conversationId: number,
): Promise<void> => {
    const getConv = await prisma.person.findUnique({
        select: {
            conversations: {
                select: {
                    id: true,
                },
            },
        },
        where: { id: user.id },
    });

    const isParticipated = !!getConv?.conversations.find((conv) => {
        return conv.id === conversationId;
    });

    if (!user.isAdmin && !isParticipated) {
        throw new ForbiddenError('Insufficient permissions');
    }
};

export default throwErrorWhenNoConvAccess;
