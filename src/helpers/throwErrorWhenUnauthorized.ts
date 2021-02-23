import { ApolloError } from 'apollo-server-errors';
import { ISession } from '../types';

function throwErrorWhenUnauthorized(session?: ISession): asserts session is
ISession & Pick<Required<ISession>, 'owner'> {
    if (!session || !session.isLoggedIn || !session.owner) {
        throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
    }
}

export default throwErrorWhenUnauthorized;
