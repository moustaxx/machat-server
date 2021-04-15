/** @jest-environment node */
import { ApolloError } from 'apollo-server-errors';
import throwErrorWhenUnauthorized from '../throwErrorWhenUnauthorized';

const unauthorizedError = new ApolloError('You must be logged in!', 'UNAUTHORIZED');

it('should pass', () => {
    throwErrorWhenUnauthorized(1);
    throwErrorWhenUnauthorized(999);
});

it('should throw error when client id is null', () => {
    const fn = () => throwErrorWhenUnauthorized(null);
    expect(fn).toThrow(unauthorizedError);
});
