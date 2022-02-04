import { Conversation, Person } from '@prisma/client';
import { Ctx, Field, FieldResolver, Int, ObjectType, Resolver, Root } from 'type-graphql';
import { Context } from '../../context';
import { ConnectionType, EdgeType, Node } from '../../relay';
import { ConversationType } from '../Conversation';
import { PersonType } from '../Person';

@ObjectType({ implements: Node })
export class MessageType extends Node {
    id!: number;

    @Field((_type) => String)
    content!: string;

    @Field((_type) => Int)
    authorID!: number;

    @Field((_type) => Int)
    conversationID!: number;

    @Field((_type) => Date)
    createdAt!: Date;

    @Field((_type) => PersonType)
    author!: Person;

    @Field((_type) => ConversationType)
    conversation!: Conversation;
}

@Resolver((_of) => MessageType)
export class MessageTypeResolver {
    @FieldResolver((_type) => [PersonType])
    async author(
        @Root() message: MessageType,
        @Ctx() { prisma }: Context,
    ) {
        return prisma.message.findUnique({
            where: { id: message.id },
        }).author();
    }

    @FieldResolver((_type) => [ConversationType])
    async conversation(
        @Root() message: MessageType,
        @Ctx() { prisma }: Context,
    ) {
        return prisma.message.findUnique({
            where: { id: message.id },
        }).conversation();
    }
}

@ObjectType()
export class MessageEdge extends EdgeType(MessageType) { }

@ObjectType()
export class MessageConnection extends ConnectionType(MessageEdge) { }
