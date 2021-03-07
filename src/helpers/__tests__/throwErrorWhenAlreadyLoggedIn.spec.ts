/** @jest-environment node */
import { ApolloError } from 'apollo-server-errors';
import { ISession } from '../../types';
import throwErrorWhenAlreadyLoggedIn from '../throwErrorWhenAlreadyLoggedIn';

const alreadyLoggedInError = new ApolloError('You are already logged in!', 'ALREADY_LOGGED_IN');
const noSessionError = new ApolloError('No session!', 'NO_SESSION');

const owner: ISession['owner'] = {
    id: 1,
    username: 'test',
    email: 'test@machat.ru',
    createdAt: new Date(),
    lastSeen: new Date(),
    isAdmin: false,
};

it('should pass', () => {
    const session = { isLoggedIn: false } as any;
    const session2 = { owner } as any;

    throwErrorWhenAlreadyLoggedIn(session);
    throwErrorWhenAlreadyLoggedIn(session2);
});

it('should throw error when isLoggedIn is true', () => {
    const session = {
        isLoggedIn: true,
        owner,
    } as any;

    const fn = () => throwErrorWhenAlreadyLoggedIn(session);
    expect(fn).toThrow(alreadyLoggedInError);
});

it('should throw error when no session', () => {
    const fn = () => throwErrorWhenAlreadyLoggedIn();
    expect(fn).toThrow(noSessionError);
});
