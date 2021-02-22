import { Args, Resolver, Subscription, ArgsType, Field, Int, Root } from 'type-graphql';
import { withFilter } from 'mercurius';

import { WSContext } from '../../../context';
import { PersonType } from '../PersonType';
import isAuthorized from '../../../helpers/isAuthorized';
import { TPersonActiveStatusEvent } from '../../../PersonActiveStatus';

@ArgsType()
class PersonActiveStatusArgs {
    @Field((_type) => Int)
    userId!: number;
}

@Resolver((_of) => PersonType)
export class PersonActiveStatusResolver {
    @Subscription((_returns) => Boolean, {
        subscribe: withFilter<TPersonActiveStatusEvent, any, WSContext>(
            async (_root, _args, { session, pubsub }) => {
                isAuthorized(session);
                return pubsub.subscribe('PERSON_ACTIVE_STATUS');
            },
            (_payload, _args, { session }) => {
                try {
                    isAuthorized(session);
                } catch (error) {
                    return false;
                }

                return true;
            },
        ),
    })
    personActiveStatus(
    // eslint-disable-next-line @typescript-eslint/indent
        @Root() payload: TPersonActiveStatusEvent,
        @Args() args: PersonActiveStatusArgs,
    ) {
        if (payload.id === args.userId) return payload.active;
    }
}
