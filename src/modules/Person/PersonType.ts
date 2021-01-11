import { objectType } from 'nexus';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import {
    Conversation,
    ConversationWhereInput,
    ConversationWhereUniqueInput,
} from 'prisma-machat';

import cursorUtils from '../../helpers/cursor';
import isAuthorized from '../../helpers/isAuthorized';

export const Person = objectType({
    name: 'Person',
    definition(t) {
        t.model.id();
        t.model.username();
        t.model.email();
        t.model.isAdmin();
        t.model.createdAt();
        t.model.lastSeen();
        t.boolean('isActive', {
            resolve: (_root, _args, { session, personActiveStatus }) => {
                isAuthorized(session);
                return personActiveStatus.get(session.owner.id);
            },
        });
        t.connectionField('conversations', {
            type: 'Conversation',
            resolve: async (root, args, { session, prisma }) => {
                isAuthorized(session);

                const myID = session.owner.id;
                const whereMe: ConversationWhereInput = {
                    participants: {
                        some: {
                            id: myID,
                        },
                    },
                };

                const where: ConversationWhereInput = (root.id === myID) ? whereMe : {
                    AND: [
                        whereMe,
                        {
                            participants: {
                                some: {
                                    id: root.id,
                                },
                            },
                        },
                    ],
                };
                return findManyCursorConnection<Conversation, ConversationWhereUniqueInput>(
                    async (convArgs) => prisma.conversation.findMany({ ...convArgs, where }),
                    async () => prisma.conversation.count({ where }),
                    args,
                    cursorUtils,
                );
            },
        });
    },
});
