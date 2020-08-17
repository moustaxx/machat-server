import { objectType } from '@nexus/schema';

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
