import { queryField } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';

export const meQueryField = queryField('me', {
    type: 'Person',
    resolve: async (_root, _args, { prisma, session }) => {
        if (!session || !session.isLoggedIn || !session.owner) {
            throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
        }

        const data = await prisma.person.findOne({
            where: { id: session.owner.id },
        });

        if (!data) throw new ApolloError('No data!', 'NO_DATA');

        return data;
    },
});
