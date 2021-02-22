import { Args, Resolver, Subscription, ArgsType, Field, Int, Root } from 'type-graphql';
import { withFilter } from 'mercurius';

import { WSContext } from '../../../context';
import { MessageType } from '../MessageType';
import isAuthorized from '../../../helpers/isAuthorized';
import checkUserHasConvAccess from '../../../helpers/checkUserHasConvAccess';

@ArgsType()
class NewMessagesArgs {
    @Field((_type) => Int)
    conversationId!: number;
}

@Resolver((_of) => MessageType)
export class NewMessagesResolver {
    // eslint-disable-next-line @typescript-eslint/require-await
    @Subscription((_returns) => Boolean, {
        subscribe: withFilter<{ conversationID: number }, any, WSContext, NewMessagesArgs>(
            async (_root, args, { prisma, session, pubsub }) => {
                isAuthorized(session);
                await checkUserHasConvAccess(prisma, session.owner, args.conversationId);

                return pubsub.subscribe('NEW_MESSAGES');
            },
            async (payload, args, { prisma, session }: any) => {
                try {
                    isAuthorized(session);
                    await checkUserHasConvAccess(prisma, session.owner, args.conversationId);
                } catch (error) {
                    return false;
                }

                return payload.conversationID === args.conversationId;
            },
        ),
    })
    async newMessages(@Root() payload: MessageType, @Args() _args: NewMessagesArgs) {
        return payload;
    }
}
