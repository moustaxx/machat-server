import { queryField } from 'nexus';
import { ApolloError } from 'apollo-server-errors';
import isAuthorized from '../../../helpers/isAuthorized';

export const meQueryField = queryField('me', {
    type: 'Person',
    resolve: async (_root, _args, { prisma, session }) => {
        isAuthorized(session);

        const data = await prisma.person.findUnique({
            where: { id: session.owner.id },
        });

        if (!data) throw new ApolloError('User not found!', 'USER_NOT_FOUND');

        return data;
    },
});
