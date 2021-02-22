import { Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../../../context';
import isAuthorized from '../../../helpers/isAuthorized';
import { PersonType } from '../PersonType';

@Resolver((_of) => PersonType)
export class SessionOwnerResolver {
    @Query((_returns) => PersonType)
    sessionOwner(@Ctx() { session }: Context) {
        isAuthorized(session);
        return session.owner;
    }
}
