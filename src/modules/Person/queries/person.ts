import { PersonWhereUniqueInput } from 'prisma-machat';
import { queryField, arg, nonNull } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';

import isAuthorized from '../../../helpers/isAuthorized';

export const personQueryField = queryField('person', {
    type: 'Person',
    args: {
        where: nonNull(arg({ type: 'PersonWhereUniqueInput' })),
    },
    resolve: async (_, { where }, { prisma, session }) => {
        isAuthorized(session);

        const data = await prisma.person.findUnique({
            where: where as PersonWhereUniqueInput,
        });

        if (!data) throw new ApolloError('User not found!', 'USER_NOT_FOUND');

        return data;
    },
});
