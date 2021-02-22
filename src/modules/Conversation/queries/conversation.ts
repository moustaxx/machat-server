import { ApolloError } from 'apollo-server-errors';
import { Ctx, Args, Query, Resolver, ArgsType, Field, Int } from 'type-graphql';
import { Context } from '../../../context';
import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import isAuthorized from '../../../helpers/isAuthorized';
import { ConversationType } from '../ConversationType';

@ArgsType()
class ConversationArgs {
    @Field((_type) => Int)
    whereId!: number;
}

@Resolver((_of) => ConversationType)
export class ConversationResolver {
    @Query((_returns) => ConversationType)
    async conversation(
    // eslint-disable-next-line @typescript-eslint/indent
        @Args() args: ConversationArgs,
        @Ctx() { prisma, session }: Context,
    ) {
        isAuthorized(session);

        await checkUserHasConvAccess(prisma, session.owner, args.whereId);

        const data = await prisma.conversation.findUnique({
            where: { id: args.whereId },
        });

        if (!data) throw new ApolloError('No data!', 'NO_DATA');

        return data;
    }
}
