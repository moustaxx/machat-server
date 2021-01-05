import { objectType } from 'nexus';

export const LastRead = objectType({
    name: 'LastRead',
    definition(t) {
        t.model.lastRead();
        t.model.conversation();
        t.model.conversationID();
        t.model.personID();
        t.model.person();
    },
});
