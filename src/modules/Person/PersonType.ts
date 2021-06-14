/* eslint-disable @typescript-eslint/indent */
import { Conversation, Message, Prisma } from '@prisma/client';
import { Args, Authorized, Ctx, Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql';
import { ConnectionArguments, findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ForbiddenError } from 'apollo-server-errors';

import { Context } from '../../context';
import { PersonMessagesArgs } from '../../generated/type-graphql';
import { ConversationConnection, ConversationType } from '../Conversation/ConversationType';
import { Connection, ConnectionArgs, ConnectionType, EdgeType, Node } from '../../relay';
import cursorUtils from '../../helpers/cursor';
import { MessageType } from '../Message';

@ObjectType({ implements: Node })
export class PersonType extends Node {
    id!: number;

    @Field((_type) => Boolean)
    isActive!: boolean;

    @Field((_type) => Date)
    createdAt!: Date;

    @Field((_type) => String)
    email!: string;

    @Field((_type) => Boolean)
    isAdmin!: boolean;

    @Field((_type) => Date, { nullable: true })
    lastSeen?: Date | null;

    @Field((_type) => String)
    username!: string;

    @Field((_type) => [MessageType])
    messages!: MessageType[];

    @Field((_type) => ConversationConnection)
    conversations!: Connection<ConversationType>;
}

@Resolver((_of) => PersonType)
export class PersonTypeResolver {
    @Authorized()
    @FieldResolver()
    isActive(@Root() person: PersonType, @Ctx() ctx: Context<true>) {
        return ctx.personActiveStatus.get(person.id);
    }

    @Authorized()
    @FieldResolver()
    async conversations(
        @Root() person: PersonType,
        @Args((_type) => ConnectionArgs) args: ConnectionArguments,
        @Ctx() { clientID, prisma }: Context<true>,
    ) {
        const whereMe: Prisma.ConversationWhereInput = {
            participants: {
                some: {
                    id: clientID,
                },
            },
        };

        const where: Prisma.ConversationWhereInput = (person.id === clientID) ? whereMe : {
            AND: [
                whereMe,
                {
                    participants: {
                        some: {
                            id: person.id,
                        },
                    },
                },
            ],
        };


        return findManyCursorConnection<
            Conversation, Prisma.ConversationWhereUniqueInput
        >(
            async (convArgs) => prisma.conversation.findMany({ ...convArgs, where }),
            async () => prisma.conversation.count({ where }),
            args,
            cursorUtils,
        );
    }

    @FieldResolver((_type) => [MessageType])
    async messages(
        @Root() person: PersonType,
        @Ctx() { prisma, isClientAdmin }: Context,
        @Args() args: PersonMessagesArgs,
    ): Promise<Message[]> {
        if (!isClientAdmin) {
            throw new ForbiddenError('Insufficient permissions');
        }

        return prisma.person.findUnique({
            where: { id: person.id },
            select: { messages: true },
        }).messages(args);
    }
}

@ObjectType()
export class PersonEdge extends EdgeType(PersonType) { }

@ObjectType()
export class PersonConnection extends ConnectionType(PersonEdge) { }
