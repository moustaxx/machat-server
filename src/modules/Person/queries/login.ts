import { queryField, stringArg } from '@nexus/schema';
import { ApolloError, ValidationError } from 'apollo-server-errors';

import { getHash } from '../helpers/getHash';

export const loginQueryField = queryField('login', {
    type: 'Person',
    args: {
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
    },
    resolve: async (_, { username, password }, { prisma, session }) => {
        if (session?.isLoggedIn) {
            throw new ApolloError('You are already logged in!', 'ALREADY_LOGGED_IN');
        }

        const data = await prisma.person.findOne({ where: { username } });

        if (!data) throw new ValidationError('Wrong username or password!');

        const hashFromInput = getHash(password, data.salt);
        const isValid = data.hash === hashFromInput;

        if (!isValid) throw new ValidationError('Wrong username or password!');

        if (!session) throw new ApolloError('No session!', 'NO_SESSION');
        session.isLoggedIn = true;
        session.owner = data;

        return data;
    },
});
