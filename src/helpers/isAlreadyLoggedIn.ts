import { ApolloError } from 'apollo-server-errors';
import { ISession } from '../types';

function isAlreadyLoggedIn(session?: ISession): asserts session is ISession {
    if (!session) throw new ApolloError('No session!', 'NO_SESSION');
    if (session.isLoggedIn) {
        throw new ApolloError('You are already logged in!', 'ALREADY_LOGGED_IN');
    }
}

export default isAlreadyLoggedIn;
