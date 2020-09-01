import { ForbiddenError } from 'apollo-server-errors';
import { NexusGenAllTypes } from '../generated/nexus';
import { TPrisma } from '../prismaClient';

const checkUserHasConvAccess = async (
    prisma: TPrisma,
    user: NexusGenAllTypes['Person'],
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
        where: { id: user?.id },
    });

    const isParticipated = !!getConv?.conversations.find((conv) => {
        return conv.id === conversationId;
    });

    if (!user?.isAdmin && !isParticipated) {
        throw new ForbiddenError('Insufficient permissions');
    }
};

export default checkUserHasConvAccess;
