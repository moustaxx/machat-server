/** @jest-environment node */
import { ApolloError } from 'apollo-server-errors';
import throwErrorWhenAlreadyLoggedIn from '../throwErrorWhenAlreadyLoggedIn';

const alreadyLoggedInError = new ApolloError('You are already logged in!', 'ALREADY_LOGGED_IN');

it('should pass', () => {
    throwErrorWhenAlreadyLoggedIn(false);
});

it('should throw error when isLoggedIn is true', () => {
    const fn = () => throwErrorWhenAlreadyLoggedIn(true);
    expect(fn).toThrow(alreadyLoggedInError);
});
