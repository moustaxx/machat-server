import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../../../context';
import { PersonType } from '../PersonType';

@Resolver((_of) => PersonType)
export class SessionOwnerResolver {
    @Authorized()
    @Query((_returns) => PersonType)
    sessionOwner(@Ctx() { session }: Context<true>) {
        return session.owner;
    }
}
