import { mutationField, stringArg, intArg } from '@nexus/schema';
import { ApolloError, UserInputError } from 'apollo-server-errors';
import checkIsConvParticipated from '../../../helpers/checkIsConvParticipated';

export const createMessageMutationField = mutationField('createMessage', {
    type: 'Message',
    args: {
        content: stringArg({ required: true }),
        conversationId: intArg({ required: true }),
    },
    resolve: async (_root, args, { prisma, session }) => {
        if (!session || !session.isLoggedIn || !session.owner) {
            throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
        }

        if (args.content.length < 1) throw new UserInputError('Message cannot be empty!');

        await checkIsConvParticipated(prisma, session.owner, args.conversationId);

        const data = await prisma.message.create({
            data: {
                content: args.content,
                author: {
                    connect: { id: session.owner.id },
                },
                conversation: {
                    connect: { id: args.conversationId },
                },
            },
        });

        if (!data) throw new ApolloError('No data!', 'NO_DATA');

        return data;
    },
});
