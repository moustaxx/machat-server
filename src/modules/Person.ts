import { objectType, queryField, stringArg, mutationField, arg } from '@nexus/schema';
import { ValidationError, ForbiddenError, ApolloError } from 'apollo-server-errors';
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
        t.model.messages();
        t.model.conversations();
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
        const data = await prisma.person.findOne({ where: { username } });

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

export const getUserQueryField = queryField('getUser', {
    type: 'Person',
    args: {
        where: arg({ type: 'PersonWhereUniqueInput', required: true }),
    },
    resolve: async (_, { where }, { prisma }) => {
        const data = await prisma.person.findOne({
            where: { ...where as any },
        });
        if (!data) throw new ApolloError('No data', 'NO_DATA');

        return data;
    },
});

export const getSessionOwnerQueryField = queryField('getSessionOwner', {
    type: 'Person',
    resolve: async (_root, _args, { session }) => {
        if (!session || !session.isLoggedIn || !session.owner) {
            throw new ForbiddenError('You must be logged in to get session owner!');
        }
        return session.owner;
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
        });

        if (!session) throw new ApolloError('No session!', 'NO_DATA');
        session.isLoggedIn = true;
        session.owner = data;
        return data;
    },
});
