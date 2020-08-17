import { queryField } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';

export const sessionOwnerQueryField = queryField('sessionOwner', {
    type: 'Person',
    resolve: async (_root, _args, { session }) => {
        if (!session || !session.isLoggedIn || !session.owner) {
            throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
        }
        return session.owner;
    },
});
