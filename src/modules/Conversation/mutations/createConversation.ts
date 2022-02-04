import { Ctx, Args, Resolver, Mutation, ArgsType, Field, Authorized, Int } from 'type-graphql';
import { UserInputError } from 'apollo-server-errors';

import { Context } from '../../../context';
import { ConversationType } from '../ConversationType';

@ArgsType()
class CreateConversationArgs {
    @Field()
    name!: string;

    @Field((_type) => [Int])
    participantIDs!: number[];
}

@Resolver((_of) => ConversationType)
export class CreateConversationResolver {
    @Authorized()
    @Mutation((_returns) => ConversationType)
    async createConversation(
        @Args() args: CreateConversationArgs,
        @Ctx() { prisma, clientID }: Context<true>,
    ) {
        const name = args.name.trim();
        const participants = args.participantIDs.flatMap((id) => {
            return id !== clientID ? { id } : [];
        });

        if (args.name.length < 2) throw new UserInputError('Name cannot be empty!');
        if (participants.length === 0) {
            throw new UserInputError('Cannot create conversation without participants!');
        }

        const data = await prisma.conversation.create({
            data: {
                name,
                participants: { connect: [{ id: clientID }, ...participants] },
            },
        });

        return data;
    }
}
