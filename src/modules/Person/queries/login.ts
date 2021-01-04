import { nonNull, queryField, stringArg } from 'nexus';
import { ApolloError } from 'apollo-server-errors';
import argon2 from 'argon2';

import isAlreadyLoggedIn from '../../../helpers/isAlreadyLoggedIn';

const wrongCredentialsError = new ApolloError('Wrong username or password!', 'WRONG_CREDENTIALS');

export const loginQueryField = queryField('login', {
    type: 'Person',
    args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
    },
    resolve: async (_, args, { prisma, session }) => {
        isAlreadyLoggedIn(session);

        const username = args.username.trim();

        const data = await prisma.person.findUnique({ where: { username } });
        if (!data) throw wrongCredentialsError;

        const isVerified = await argon2.verify(data.hash, args.password); // TODO
        if (!isVerified) throw wrongCredentialsError;

        session.isLoggedIn = true;
        session.owner = data;

        return data;
    },
});
