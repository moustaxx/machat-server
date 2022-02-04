import { Ctx, Args, Resolver, Mutation, ArgsType, Field, Int, Authorized } from 'type-graphql';

import { Context } from '../../../context';
import throwErrorWhenNoConvAccess from '../../../helpers/throwErrorWhenNoConvAccess';
import { LastReadType } from '../LastReadType';

@ArgsType()
class MarkConvAsReadArgs {
    @Field((_type) => Int)
    conversationId!: number;
}

@Resolver((_of) => LastReadType)
export class MarkConvAsReadResolver {
    @Authorized()
    @Mutation((_returns) => LastReadType)
    async markConvAsRead(
        @Args() args: MarkConvAsReadArgs,
        @Ctx() { prisma, clientID }: Context<true>,
    ) {
        await throwErrorWhenNoConvAccess(prisma, clientID, args.conversationId);

        const data = await prisma.lastRead.upsert({
            create: {
                person: { connect: { id: clientID } },
                conversation: { connect: { id: args.conversationId } },
                lastRead: new Date(),
            },
            update: {
                lastRead: new Date(),
            },
            where: {
                personID_conversationID: {
                    personID: clientID,
                    conversationID: args.conversationId,
                },
            },
        });

        return data;
    }
}
