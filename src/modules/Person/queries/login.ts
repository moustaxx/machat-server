import { queryField, stringArg } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';
import argon2 from 'argon2';

const wrongCredentialsError = new ApolloError('Wrong username or password!', 'WRONG_CREDENTIALS');

export const loginQueryField = queryField('login', {
    type: 'Person',
    args: {
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
    },
    resolve: async (_, args, { prisma, session }) => {
        if (session?.isLoggedIn) {
            throw new ApolloError('You are already logged in!', 'ALREADY_LOGGED_IN');
        }

        const username = args.username.trim();

        const data = await prisma.person.findOne({ where: { username } });
        if (!data) throw wrongCredentialsError;

        const isVerified = await argon2.verify(data.hash, args.password); // TODO
        if (!isVerified) throw wrongCredentialsError;

        if (!session) throw new ApolloError('No session!', 'NO_SESSION');
        session.isLoggedIn = true;
        session.owner = data;

        return data;
    },
});
