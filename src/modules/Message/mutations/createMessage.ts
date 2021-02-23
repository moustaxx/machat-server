import { Ctx, Args, Resolver, Mutation, ArgsType, Field, Int, Authorized } from 'type-graphql';
import { UserInputError } from 'apollo-server-errors';

import { Context } from '../../../context';
import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import { MessageType } from '../MessageType';

@ArgsType()
class CreateMessageArgs {
    @Field()
    content!: string;

    @Field((_type) => Int)
    conversationId!: number;
}

@Resolver((_of) => MessageType)
export class CreateMessageResolver {
    @Authorized()
    @Mutation((_returns) => MessageType)
    async createMessage(
    // eslint-disable-next-line @typescript-eslint/indent
        @Args() args: CreateMessageArgs,
        @Ctx() { prisma, session, pubsub }: Context<true>,
    ) {
        const content = args.content.trim();
        if (content.length < 1) throw new UserInputError('Message cannot be empty!');

        await checkUserHasConvAccess(prisma, session.owner, args.conversationId);

        const data = await prisma.message.create({
            data: {
                content,
                author: { connect: { id: session.owner.id } },
                conversation: { connect: { id: args.conversationId } },
            },
        });

        pubsub.publish({
            topic: 'NEW_MESSAGES',
            payload: data,
        });

        return data;
    }
}
