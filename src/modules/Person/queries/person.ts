import { PersonWhereUniqueInput } from '@prisma/client';
import { queryField, arg } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';

import isAuthorized from '../../../helpers/isAuthorized';

export const personQueryField = queryField('person', {
    type: 'Person',
    args: {
        where: arg({ type: 'PersonWhereUniqueInput', required: true }),
    },
    resolve: async (_, { where }, { prisma, session }) => {
        isAuthorized(session);

        const data = await prisma.person.findOne({
            where: where as PersonWhereUniqueInput,
        });

        if (!data) throw new ApolloError('User not found!', 'USER_NOT_FOUND');

        return data;
    },
});
