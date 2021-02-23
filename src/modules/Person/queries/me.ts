import { ApolloError } from 'apollo-server-errors';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../../../context';
import { PersonType } from '../PersonType';

@Resolver((_of) => PersonType)
export class MeResolver {
    @Authorized()
    @Query((_returns) => PersonType)
    async me(@Ctx() { prisma, session }: Context<true>) {
        const data = await prisma.person.findUnique({
            where: { id: session.owner.id },
        });

        if (!data) throw new ApolloError('User not found!', 'USER_NOT_FOUND');

        return data;
    }
}
