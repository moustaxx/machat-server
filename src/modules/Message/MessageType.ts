import { objectType } from '@nexus/schema';

export const Message = objectType({
    name: 'Message',
    definition(t) {
        t.model.id();
        t.model.content();
        t.model.conversation();
        t.model.conversationID();
        t.model.authorID();
        t.model.author();
        t.model.createdAt();
    },
});
