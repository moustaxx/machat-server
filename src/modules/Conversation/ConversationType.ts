import { Args, Ctx, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql';
import { Context } from '../../context';
import { Conversation, ConversationParticipantsArgs, ConversationRelationsResolver } from '../../generated/type-graphql';
import { ConnectionType, EdgeType } from '../../relay';
import { PersonType } from '../Person';

@ObjectType()
export class ConversationType extends Conversation { }

@Resolver((_of) => ConversationType)
export class ConversationTypeResolver extends ConversationRelationsResolver {
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
}

@ObjectType()
export class ConversationEdge extends EdgeType(ConversationType) { }

@ObjectType()
export class ConversationConnection extends ConnectionType(ConversationEdge) { }
