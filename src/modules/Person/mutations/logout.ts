import { Ctx, Resolver, Mutation } from 'type-graphql';

import { Context } from '../../../context';
import { PersonType } from '../PersonType';
import isAuthorized from '../../../helpers/isAuthorized';

@Resolver((_of) => PersonType)
export class LogoutResolver {
    @Mutation((_returns) => PersonType)
    logout(@Ctx() { session, req, reply }: Context) {
        isAuthorized(session);

        const { owner } = session;
        req.destroySession((err) => err && console.log);
        req.session = null as any;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        reply.setCookie('loggedIn', '0');

        return owner;
    }
}
