import { Args, Resolver, Subscription, ArgsType, Field, Int, Root } from 'type-graphql';
import { withFilter } from 'mercurius';

import { WSContext } from '../../../context';
import { MessageType } from '../MessageType';
import throwErrorWhenUnauthorized from '../../../helpers/throwErrorWhenUnauthorized';
import throwErrorWhenNoConvAccess from '../../../helpers/throwErrorWhenNoConvAccess';

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
                throwErrorWhenUnauthorized(session);
                await throwErrorWhenNoConvAccess(prisma, session.owner, args.conversationId);

                return pubsub.subscribe('NEW_MESSAGES');
            },
            async (payload, args, { prisma, session }: WSContext) => {
                try {
                    throwErrorWhenUnauthorized(session);
                    await throwErrorWhenNoConvAccess(prisma, session.owner, args.conversationId);
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
