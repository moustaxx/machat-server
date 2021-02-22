import { Ctx, Args, Resolver, Mutation, ArgsType, Field, Int } from 'type-graphql';

import { Context } from '../../../context';
import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';
import isAuthorized from '../../../helpers/isAuthorized';
import { LastReadType } from '../LastReadType';

@ArgsType()
class MarkConvAsReadArgs {
    @Field((_type) => Int)
    conversationId!: number;
}

@Resolver((_of) => LastReadType)
export class MarkConvAsReadResolver {
    @Mutation((_returns) => LastReadType)
    async markConvAsRead(
    // eslint-disable-next-line @typescript-eslint/indent
        @Args() args: MarkConvAsReadArgs,
        @Ctx() { prisma, session }: Context,
    ) {
        isAuthorized(session);
        await checkUserHasConvAccess(prisma, session.owner, args.conversationId);

        const data = await prisma.lastRead.upsert({
            create: {
                person: { connect: { id: session.owner.id } },
                conversation: { connect: { id: args.conversationId } },
                lastRead: new Date(),
            },
            update: {
                lastRead: new Date(),
            },
            where: {
                personID_conversationID: {
                    personID: session.owner.id,
                    conversationID: args.conversationId,
                },
            },
        });

        return data;
    }
}
