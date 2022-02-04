import { Ctx, Args, Resolver, Mutation, ArgsType, Field, Int, Authorized } from 'type-graphql';
import { Context } from '../../../context';
import throwErrorWhenNoConvAccess from '../../../helpers/throwErrorWhenNoConvAccess';
import { ConversationType } from '../ConversationType';

@ArgsType()
class AddPersonToConversationArgs {
    @Field((_type) => Int)
    conversationId!: number;

    @Field((_type) => Int)
    personId!: number;
}

@Resolver((_of) => ConversationType)
export class AddPersonToConversationResolver {
    @Authorized()
    @Mutation((_returns) => ConversationType)
    async addPersonToConversation(
        @Args() args: AddPersonToConversationArgs,
        @Ctx() { prisma, clientID }: Context<true>,
    ) {
        await throwErrorWhenNoConvAccess(prisma, clientID, args.conversationId);

        const data = await prisma.conversation.update({
            where: { id: args.conversationId },
            data: {
                participants: {
                    connect: { id: args.personId },
                },
            },
        });

        return data;
    }
}
