import { Connection, ConnectionArguments, findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Person, Message, Prisma } from '@prisma/client';
import { Args, Ctx, Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql';

import { Context } from '../../context';
import { ConversationLastReadArgs } from '../../generated/type-graphql';
import cursorUtils from '../../helpers/cursor';
import { ConnectionArgs, ConnectionType, EdgeType, Node } from '../../relay';
import { LastReadType } from '../LastRead';
import { MessageConnection, MessageType } from '../Message';
import { PersonConnection, PersonType } from '../Person';

@ObjectType({ implements: Node })
export class ConversationType extends Node {
    id!: number;

    @Field((_type) => Date)
    createdAt!: Date;

    @Field((_type) => String)
    name!: string;

    @Field((_type) => PersonConnection)
    participants!: Connection<PersonType>;

    @Field((_type) => MessageConnection)
    messages!: MessageType[];

    lastRead!: LastReadType[];
}

@Resolver((_of) => ConversationType)
export class ConversationTypeResolver {
    @FieldResolver((_type) => [PersonConnection])
    async participants(
    // eslint-disable-next-line @typescript-eslint/indent
        @Root() conversation: ConversationType,
        @Ctx() { prisma }: Context,
        @Args((_type) => ConnectionArgs) args: ConnectionArguments,
    ) {
        const where = {
            conversations: {
                some: { id: conversation.id },
            },
        };
        return findManyCursorConnection<Person, Prisma.PersonWhereUniqueInput>(
            async (convArgs) => prisma.person.findMany({ ...convArgs, where }),
            async () => prisma.person.count({ where }),
            args,
            cursorUtils,
        );
    }

    @FieldResolver((_type) => [MessageConnection])
    async messages(
    // eslint-disable-next-line @typescript-eslint/indent
        @Root() conversation: ConversationType,
        @Ctx() { prisma }: Context,
        @Args((_type) => ConnectionArgs) args: ConnectionArguments,
    ) {
        const where = {
            conversation: { id: conversation.id },
        };
        return findManyCursorConnection<Message, Prisma.MessageWhereUniqueInput>(
            async (convArgs) => prisma.message.findMany({ ...convArgs, where }),
            async () => prisma.message.count({ where }),
            args,
            cursorUtils,
        );
    }

    @FieldResolver((_type) => [LastReadType])
    async lastRead(
    // eslint-disable-next-line @typescript-eslint/indent
        @Root() conversation: ConversationType,
        @Ctx() { prisma }: Context,
        @Args() args: ConversationLastReadArgs,
    ) {
        return prisma.conversation.findUnique({
            where: { id: conversation.id },
        }).lastRead(args);
    }
}

@ObjectType()
export class ConversationEdge extends EdgeType(ConversationType) { }

@ObjectType()
export class ConversationConnection extends ConnectionType(ConversationEdge) { }
