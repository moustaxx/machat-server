import { nonNull, intArg, subscriptionField } from 'nexus';
import { withFilter } from 'mercurius';

import isAuthorized from '../../../helpers/isAuthorized';
import { TPersonActiveStatusEvent } from '../../../PersonActiveStatus';
import { WSContext } from '../../../context';

export const personActiveStatus = subscriptionField('personActiveStatus', {
    type: 'Boolean',
    resolve: (payload: TPersonActiveStatusEvent) => payload.active,
    args: {
        userId: nonNull(intArg()),
    },
    subscribe: withFilter(
        async (_root, args, ctxFix) => {
            const { session, pubsub } = ctxFix as any as WSContext;
            isAuthorized(session);
            return pubsub.subscribe('PERSON_ACTIVE_STATUS');
        },
        (_payload: TPersonActiveStatusEvent, _args, { session }) => {
            try {
                isAuthorized(session);
            } catch (error) {
                return false;
            }

            return true;
        },
    ),
});
