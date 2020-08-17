import { objectType } from '@nexus/schema';

export const Person = objectType({
    name: 'Person',
    definition(t) {
        t.model.id();
        t.model.username();
        t.model.email();
        t.model.isActive();
        t.model.isAdmin();
        t.model.createdAt();
        t.model.lastSeen();
        t.model.messages();
        t.model.conversations();
    },
});
