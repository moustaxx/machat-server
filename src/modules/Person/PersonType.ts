import { objectType } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import {
    Conversation,
    ConversationWhereInput,
    ConversationWhereUniqueInput,
// eslint-disable-next-line import/no-extraneous-dependencies
} from '@prisma/client';

import { ISession } from '../../types';
import cursorUtils from '../../helpers/cursor';

function isAuthorized(session?: ISession): asserts session is ISession & Pick<Required<ISession>, 'owner'> {
    if (!session || !session.isLoggedIn || !session.owner) {
        throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
    }
}

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
        t.connectionField('conversations', {
            type: 'Conversation',
            resolve: (root, args, { session, prisma }) => {
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
                    (convArgs) => prisma.conversation.findMany({ ...convArgs, where }),
                    () => prisma.conversation.count({ where }),
                    args,
                    cursorUtils,
                );
            },
        });
    },
});
