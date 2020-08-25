import { objectType } from '@nexus/schema';

import onlyAdminCRUDResolver from '../helpers/onlyAdminCRUDResolver';

export const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.people({ resolve: onlyAdminCRUDResolver });
        t.crud.conversations({ resolve: onlyAdminCRUDResolver });
        t.crud.message({ resolve: onlyAdminCRUDResolver });
        t.crud.messages({ resolve: onlyAdminCRUDResolver });
    },
});
