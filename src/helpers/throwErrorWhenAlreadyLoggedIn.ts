import { ApolloError } from 'apollo-server-errors';

function throwErrorWhenAlreadyLoggedIn(isLoggedIn: boolean | null) {
    if (isLoggedIn) {
        throw new ApolloError('You are already logged in!', 'ALREADY_LOGGED_IN');
    }
}

export default throwErrorWhenAlreadyLoggedIn;
