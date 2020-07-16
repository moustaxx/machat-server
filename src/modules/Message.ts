import { objectType } from '@nexus/schema';

// eslint-disable-next-line import/prefer-default-export
export const Message = objectType({
    name: 'Message',
    definition(t) {
        t.model.id();
        t.model.content();
        t.model.conversation();
        t.model.conversationID();
        t.model.createdAt();
    },
});
