import { Ctx, Args, Resolver, Mutation, ArgsType, Field, Int, Authorized } from 'type-graphql';
import { Context } from '../../../context';
import throwErrorWhenNoConvAccess from '../../../helpers/throwErrorWhenNoConvAccess';
import { ConversationType } from '../ConversationType';

@ArgsType()
class RemovePersonFromConversationArgs {
    @Field((_type) => Int)
    conversationId!: number;

    @Field((_type) => Int)
    personId!: number;
}

@Resolver((_of) => ConversationType)
export class RemovePersonFromConversationResolver {
    @Authorized()
    @Mutation((_returns) => ConversationType)
    async removePersonFromConversation(
        @Args() args: RemovePersonFromConversationArgs,
        @Ctx() { prisma, clientID }: Context<true>,
    ) {
        await throwErrorWhenNoConvAccess(prisma, clientID, args.conversationId);

        const data = await prisma.conversation.update({
            where: { id: args.conversationId },
            data: {
                participants: {
                    disconnect: { id: args.personId },
                },
            },
        });

        return data;
    }
}
