/** @jest-environment node */
import { ApolloError } from 'apollo-server-errors';
import { NexusGenAllTypes } from '../../generated/nexus';
import isAlreadyLoggedIn from '../isAlreadyLoggedIn';

const alreadyLoggedInError = new ApolloError('You are already logged in!', 'ALREADY_LOGGED_IN');
const noSessionError = new ApolloError('No session!', 'NO_SESSION');

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
    const session = { isLoggedIn: false } as any;
    const session2 = { owner } as any;

    isAlreadyLoggedIn(session);
    isAlreadyLoggedIn(session2);
});

it('should throw error when isLoggedIn is true', () => {
    const session = {
        isLoggedIn: true,
        owner,
    } as any;

    const fn = () => isAlreadyLoggedIn(session);
    expect(fn).toThrow(alreadyLoggedInError);
});

it('should throw error when no session', () => {
    const fn = () => isAlreadyLoggedIn();
    expect(fn).toThrow(noSessionError);
});
