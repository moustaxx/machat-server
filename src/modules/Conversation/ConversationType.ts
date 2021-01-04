import { objectType } from 'nexus';

export const Conversation = objectType({
    name: 'Conversation',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.messages();
        t.model.createdAt();
        t.model.participants();
    },
});
