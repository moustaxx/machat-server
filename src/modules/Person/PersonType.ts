/* eslint-disable @typescript-eslint/indent */
import { Conversation, Prisma } from '@prisma/client';
import { Args, Authorized, Ctx, Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql';
import { ConnectionArguments, findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ForbiddenError } from 'apollo-server-errors';

import { Context } from '../../context';
import { Message, Person, PersonMessagesArgs } from '../../generated/type-graphql';
import { ConversationConnection, ConversationType } from '../Conversation/ConversationType';
import { Connection, ConnectionArgs, Node } from '../../relay';
import cursorUtils from '../../helpers/cursor';

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

    @Field((_type) => [Message])
    messages?: Message[];

    @Field((_type) => ConversationConnection)
    conversations!: Promise<Connection<ConversationType>>;
}

@Resolver((_of) => PersonType)
export class PersonTypeResolver {
    @Authorized()
    @FieldResolver()
    isActive(@Root() _person: PersonType, @Ctx() ctx: Context<true>) {
        return ctx.personActiveStatus.get(ctx.session.owner.id);
    }

    @Authorized()
    @FieldResolver()
    async conversations(
        @Root() person: PersonType,
        @Args((_type) => ConnectionArgs) args: ConnectionArguments,
        @Ctx() { session, prisma }: Context<true>,
    ) {
        const myID = session.owner.id;
        const whereMe: Prisma.ConversationWhereInput = {
            participants: {
                some: {
                    id: myID,
                },
            },
        };

        const where: Prisma.ConversationWhereInput = (person.id === myID) ? whereMe : {
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

    @FieldResolver((_type) => [Message])
    async messages(
        @Root() person: Person,
        @Ctx() { prisma, session }: Context,
        @Args() args: PersonMessagesArgs,
    ): Promise<Message[]> {
        if (!session?.owner?.isAdmin) {
            throw new ForbiddenError('Insufficient permissions');
        }

        return prisma.person.findUnique({
            where: { id: person.id },
            select: { messages: true },
        }).messages(args);
    }
}
