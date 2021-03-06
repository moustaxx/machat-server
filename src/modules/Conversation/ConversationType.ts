import { Args, Ctx, Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql';
import { Context } from '../../context';
import { Conversation, ConversationLastReadArgs, ConversationMessagesArgs, ConversationParticipantsArgs } from '../../generated/type-graphql';
import { ConnectionType, EdgeType, Node } from '../../relay';
import { LastReadType } from '../LastRead';
import { MessageType } from '../Message';
import { PersonType } from '../Person';

@ObjectType({ implements: Node })
export class ConversationType extends Node {
    id!: number;

    @Field((_type) => Date)
    createdAt!: Date;

    @Field((_type) => String)
    name!: string;

    participants?: PersonType[];

    messages?: MessageType[];

    lastRead?: LastReadType[];
}

@Resolver((_of) => ConversationType)
export class ConversationTypeResolver {
    @FieldResolver((_type) => [PersonType])
    async participants(
    // eslint-disable-next-line @typescript-eslint/indent
        @Root() conversation: Conversation,
        @Ctx() { prisma }: Context,
        @Args() args: ConversationParticipantsArgs,
    ) {
        return prisma.conversation.findUnique({
            where: { id: conversation.id },
        }).participants(args);
    }

    @FieldResolver((_type) => [MessageType])
    async messages(
    // eslint-disable-next-line @typescript-eslint/indent
        @Root() conversation: Conversation,
        @Ctx() { prisma }: Context,
        @Args() args: ConversationMessagesArgs,
    ) {
        return prisma.conversation.findUnique({
            where: { id: conversation.id },
        }).messages(args);
    }

    @FieldResolver((_type) => [LastReadType])
    async lastRead(
    // eslint-disable-next-line @typescript-eslint/indent
        @Root() conversation: Conversation,
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
