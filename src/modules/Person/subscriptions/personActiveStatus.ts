import { Args, Resolver, Subscription, ArgsType, Field, Int, Root } from 'type-graphql';
import { withFilter } from 'mercurius';

import { WSContext } from '../../../context';
import { PersonType } from '../PersonType';
import throwErrorWhenUnauthorized from '../../../helpers/throwErrorWhenUnauthorized';
import { TPersonActiveStatusEvent } from '../../../PersonActiveStatus';

@ArgsType()
class PersonActiveStatusArgs {
    @Field((_type) => Int)
    userId!: number;
}

@Resolver((_of) => PersonType)
export class PersonActiveStatusResolver {
    @Subscription((_returns) => Boolean, {
        subscribe: withFilter<TPersonActiveStatusEvent, any, WSContext, PersonActiveStatusArgs>(
            async (_root, _args, { clientID, pubsub }) => {
                throwErrorWhenUnauthorized(clientID);
                return pubsub.subscribe('PERSON_ACTIVE_STATUS');
            },
            (payload, args, { clientID }) => {
                try {
                    throwErrorWhenUnauthorized(clientID);
                    if (payload.id !== args.userId) return false;
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
