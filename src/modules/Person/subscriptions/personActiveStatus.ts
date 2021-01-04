import { nonNull, intArg, subscriptionField } from 'nexus';
import { withFilter } from 'mercurius';

import isAuthorized from '../../../helpers/isAuthorized';
import { TPersonActiveStatusEvent } from '../../../PersonActiveStatus';

export const personActiveStatus = subscriptionField('personActiveStatus', {
    type: 'Boolean',
    resolve: (payload: TPersonActiveStatusEvent) => payload.active,
    args: {
        userId: nonNull(intArg()),
    },
    subscribe: withFilter(
        async (_root, args, { session, pubsub }) => {
            isAuthorized(session);
            return pubsub.subscribe('PERSON_ACTIVE_STATUS');
        },
        async (_payload: TPersonActiveStatusEvent, _args, { session }) => {
            try {
                isAuthorized(session);
            } catch (error) {
                return false;
            }

            return true;
        },
    ),
});
