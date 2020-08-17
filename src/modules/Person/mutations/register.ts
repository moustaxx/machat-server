import { mutationField, stringArg } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';
import { randomBytes } from 'crypto';

import { getHash } from '../helpers/getHash';

export const registerMutationField = mutationField('register', {
    type: 'Person',
    args: {
        email: stringArg({ required: true }),
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
    },
    resolve: async (_, { email, username, password }, { prisma, session }) => {
        if (session?.isLoggedIn) {
            throw new ApolloError('You are already logged in!', 'ALREADY_LOGGED_IN');
        }

        const salt = randomBytes(16).toString('hex');
        const hash = getHash(password, salt);

        const data = await prisma.person.create({
            data: {
                email,
                username,
                salt,
                hash,
            },
        });

        if (!session) throw new ApolloError('No session!', 'NO_SESSION');
        session.isLoggedIn = true;
        session.owner = data;
        return data;
    },
});
