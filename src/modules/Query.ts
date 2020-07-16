import { objectType } from '@nexus/schema';

// eslint-disable-next-line import/prefer-default-export
export const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.person();
        t.crud.people();
        t.crud.conversation();
        t.crud.conversations();
        t.crud.message();
        t.crud.messages();
    },
});
