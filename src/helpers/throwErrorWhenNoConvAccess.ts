import { ForbiddenError } from 'apollo-server-errors';
import { TPrisma } from '../prismaClient';

const throwErrorWhenNoConvAccess = async (
    prisma: TPrisma,
    userID: number,
    conversationID: number,
): Promise<void> => {
    const data = await prisma.person.findUnique({
        select: {
            isAdmin: true,
            conversations: {
                select: {
                    id: true,
                },
            },
        },
        where: { id: userID },
    });

    const isParticipated = !!data?.conversations.find((conv) => {
        return conv.id === conversationID;
    });

    if (!data?.isAdmin && !isParticipated) {
        throw new ForbiddenError('Insufficient permissions');
    }
};

export default throwErrorWhenNoConvAccess;
