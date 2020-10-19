import { mutationField, stringArg } from '@nexus/schema';
import { ApolloError, ValidationError } from 'apollo-server-errors';
import { randomBytes } from 'crypto';

import { getHash } from '../helpers/getHash';

const checkIsEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const registerMutationField = mutationField('register', {
    type: 'Person',
    args: {
        email: stringArg({ required: true }),
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
    },
    resolve: async (_, args, { prisma, session }) => {
        if (session?.isLoggedIn) {
            throw new ApolloError('You are already logged in!', 'ALREADY_LOGGED_IN');
        }

        const username = args.username.trim();
        if (username.length <= 3) throw new ValidationError('Username length must be > 3');
        if (username.length > 20) throw new ValidationError('Username length must be > 20');

        const { password } = args;
        if (password.length <= 5) throw new ValidationError('Password length must be > 5');
        if (password.length > 100) throw new ValidationError('Password length must be < 100');

        const email = args.email.trim();
        if (!checkIsEmail(email)) throw new ValidationError('Wrong email');

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
