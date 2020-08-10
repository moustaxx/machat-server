import { objectType, queryField, stringArg, mutationField } from '@nexus/schema';
import { ValidationError, ForbiddenError } from 'apollo-server-errors';
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
        t.model.message();
    },
});

const getHash = (password: string, salt: string) => {
    return scryptSync(password, salt, 32).toString('hex');
};

export const loginQueryField = queryField('login', {
    type: 'Person',
    args: {
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
    },
    resolve: async (_, { username, password }, { prisma, session }) => {
        const data = await prisma.person.findOne({
            where: {
                username,
            },
            include: {
                message: true,
            },
        });

        if (!data) throw new ValidationError('Wrong username or password!');

        const hashFromInput = getHash(password, data.salt);
        const isValid = data.hash === hashFromInput;

        if (!isValid) throw new ValidationError('Wrong username or password!');

        if (!session) throw Error('No session!');
        session.isLoggedIn = true;
        session.owner = data;

        return data;
    },
});

export const logoutQueryField = queryField('logout', {
    type: 'Person',
    resolve: (_, _args, { session, req, reply }) => {
        if (!session || !session.isLoggedIn || !session.owner) {
            throw new ForbiddenError('You must be logged in to log out!');
        }
        const { owner } = session;
        req.destroySession((err) => err && console.log);
        req.session = null as any;
        reply.setCookie('loggedIn', '0');

        return owner;
    },
});

export const registerMutationField = mutationField('register', {
    type: 'Person',
    args: {
        email: stringArg({ required: true }),
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
    },
    resolve: async (_, { email, username, password }, { prisma, session }) => {
        const salt = randomBytes(16).toString('hex');
        const hash = getHash(password, salt);

        const data = await prisma.person.create({
            data: {
                email,
                username,
                salt,
                hash,
            },
            include: {
                message: true,
            },
        });

        if (!session) throw Error('No session!');
        session.isLoggedIn = true;
        session.owner = data;
        return data;
    },
});
