/** @jest-environment node */
import { ApolloError } from 'apollo-server-errors';
import { NexusGenAllTypes } from '../../generated/nexus';
import { ISession } from '../../types';
import isAuthorized from '../isAuthorized';

const unauthorizedError = new ApolloError('You must be logged in!', 'UNAUTHORIZED');

const owner: NexusGenAllTypes['Person'] = {
    id: 1,
    username: 'test',
    email: 'test@machat.ru',
    createdAt: Date.now(),
    lastSeen: Date.now(),
    isActive: true,
    isAdmin: false,
};


it('should pass', () => {
    const session = {
        isLoggedIn: true,
        owner,
    } as any;

    isAuthorized(session);
});

const tryCatchIsAuthorized = (session?: ISession) => {
    try {
        isAuthorized(session);
    } catch (error) {
        expect(error).toEqual(unauthorizedError);
    }
};

it('should throw error when isLoggedIn is false', () => {
    const session = {
        isLoggedIn: false,
        owner,
    } as any;

    tryCatchIsAuthorized(session);
});

it('should throw error when no owner', () => {
    const session = {
        isLoggedIn: true,
    } as any;

    tryCatchIsAuthorized(session);
});

it('should throw error when no session', () => {
    tryCatchIsAuthorized();
});
