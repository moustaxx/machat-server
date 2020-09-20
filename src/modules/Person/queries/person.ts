import { queryField, arg } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';

export const personQueryField = queryField('person', {
    type: 'Person',
    args: {
        where: arg({ type: 'PersonWhereUniqueInput', required: true }),
    },
    resolve: async (_, { where }, { prisma, session }) => {
        if (!session || !session.isLoggedIn || !session.owner) {
            throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
        }

        const data = await prisma.person.findOne({
            where: { ...where as any },
        });

        if (!data) throw new ApolloError('User not found!', 'USER_NOT_FOUND');

        return data;
    },
});
