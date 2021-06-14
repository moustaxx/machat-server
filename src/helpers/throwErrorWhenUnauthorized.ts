import { ApolloError } from 'apollo-server-errors';

function throwErrorWhenUnauthorized(clientID: number | null): asserts clientID is number {
    if (!clientID) {
        throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
    }
}

export default throwErrorWhenUnauthorized;
