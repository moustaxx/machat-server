import { objectType } from '@nexus/schema';

// eslint-disable-next-line import/prefer-default-export
export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.crud.deleteOneMessage();
        t.crud.updateOneMessage();

        t.crud.deleteOnePerson();

        t.crud.createOneConversation();
        t.crud.deleteOneConversation();
        t.crud.updateOneConversation();
    },
});
