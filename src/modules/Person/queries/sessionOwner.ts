import { queryField } from 'nexus';
import isAuthorized from '../../../helpers/isAuthorized';

export const sessionOwnerQueryField = queryField('sessionOwner', {
    type: 'Person',
    resolve: (_root, _args, { session }) => {
        isAuthorized(session);
        return session.owner;
    },
});
