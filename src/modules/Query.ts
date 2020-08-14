import { objectType } from '@nexus/schema';
import { ApolloError, UserInputError } from 'apollo-server-errors';

import onlyAdminCRUDResolver from '../helpers/onlyAdminCRUDResolver';
import checkIsConvParticipated from '../helpers/checkIsConvParticipated';

// eslint-disable-next-line import/prefer-default-export
export const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.people({ resolve: onlyAdminCRUDResolver });
        t.crud.conversation({
            resolve: (root, args, ctx, info, originalResolve) => {
                if (!ctx.session?.isLoggedIn) {
                    throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
                }
                if (!args.where.id) {
                    throw new UserInputError('where.id argument is required');
                }

                checkIsConvParticipated(ctx.prisma, ctx.session.owner, args.where.id);

                return originalResolve(root, args, ctx, info);
            },
        });
        t.crud.conversations({ resolve: onlyAdminCRUDResolver });
        t.crud.message({ resolve: onlyAdminCRUDResolver });
        t.crud.messages({ resolve: onlyAdminCRUDResolver });
    },
});
