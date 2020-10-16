import { queryField } from '@nexus/schema';
import isAuthorized from '../../../helpers/isAuthorized';

export const sessionOwnerQueryField = queryField('sessionOwner', {
    type: 'Person',
    resolve: async (_root, _args, { session }) => {
        isAuthorized(session);
        return session.owner;
    },
});
