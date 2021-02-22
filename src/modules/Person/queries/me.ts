import { ApolloError } from 'apollo-server-errors';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../../../context';
import isAuthorized from '../../../helpers/isAuthorized';
import { PersonType } from '../PersonType';

@Resolver((_of) => PersonType)
export class MeResolver {
    @Query((_returns) => PersonType)
    async me(@Ctx() { prisma, session }: Context) {
        isAuthorized(session);

        const data = await prisma.person.findUnique({
            where: { id: session.owner.id },
        });

        if (!data) throw new ApolloError('User not found!', 'USER_NOT_FOUND');

        return data;
    }
}
