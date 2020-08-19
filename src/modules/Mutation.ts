import { objectType } from '@nexus/schema';

import onlyAdminCRUDResolver from '../helpers/onlyAdminCRUDResolver';

export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.crud.deleteOneMessage({ resolve: onlyAdminCRUDResolver });
        t.crud.updateOneMessage({ resolve: onlyAdminCRUDResolver });

        t.crud.deleteOnePerson({ resolve: onlyAdminCRUDResolver });

        t.crud.createOneConversation({ resolve: onlyAdminCRUDResolver });
        t.crud.deleteOneConversation({ resolve: onlyAdminCRUDResolver });
        t.crud.updateOneConversation({ resolve: onlyAdminCRUDResolver });
    },
});
