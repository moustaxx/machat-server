import { objectType, queryField, stringArg, mutationField } from '@nexus/schema';
import { ValidationError } from 'apollo-server-errors';
import { scryptSync, randomBytes } from 'crypto';

export const Person = objectType({
    name: 'Person',
    definition(t) {
        t.model.id();
        t.model.username();
        t.model.email();
        t.model.isActive();
        t.model.createdAt();
        t.model.lastSeen();
    },
});

const getHash = (password: string, salt: string) => {
    return scryptSync(password, salt, 32).toString('hex');
};

export const usersQueryField = queryField('login', {
    type: 'Person',
    args: {
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
    },
    resolve: async (_, { username, password }, ctx) => {
        const data = await ctx.prisma.person.findOne({
            where: {
                username,
            },
        });

        if (!data) throw new ValidationError('Wrong username or password!');

        const hashFromInput = getHash(password, data.salt);
        const isValid = data.hash === hashFromInput;

        if (!isValid) throw new ValidationError('Wrong username or password!');
        return data;
    },
});

export const usersMutationField = mutationField('register', {
    type: 'Person',
    args: {
        email: stringArg({ required: true }),
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
    },
    resolve: (_, { email, username, password }, ctx) => {
        const salt = randomBytes(16).toString('hex');
        const hash = getHash(password, salt);

        return ctx.prisma.person.create({
            data: {
                email,
                username,
                salt,
                hash,
            },
        });
    },
});
