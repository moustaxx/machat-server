import { mutationField, nonNull, stringArg } from '@nexus/schema';
import { ValidationError } from 'apollo-server-errors';
import argon2 from 'argon2';

import isAlreadyLoggedIn from '../../../helpers/isAlreadyLoggedIn';
import isValidEmail from '../helpers/isValidEmail';

export const registerMutationField = mutationField('register', {
    type: 'Person',
    args: {
        email: nonNull(stringArg()),
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
    },
    resolve: async (_, args, { prisma, session }) => {
        isAlreadyLoggedIn(session);

        const username = args.username.trim();
        const email = args.email.trim();
        const { password } = args;

        if (username.length <= 3) throw new ValidationError('Username length must be > 3');
        if (username.length > 20) throw new ValidationError('Username length must be > 20');

        if (password.length <= 5) throw new ValidationError('Password length must be > 5');
        if (password.length > 100) throw new ValidationError('Password length must be < 100');

        if (!isValidEmail(email)) throw new ValidationError('Wrong email');

        const hash = await argon2.hash(password);

        const data = await prisma.person.create({
            data: {
                email,
                username,
                hash,
            },
        });

        session.isLoggedIn = true;
        session.owner = data;
        return data;
    },
});
