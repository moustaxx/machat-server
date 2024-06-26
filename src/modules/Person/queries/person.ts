import { ApolloError } from 'apollo-server-errors';
import { Ctx, Arg, Query, Resolver, Authorized } from 'type-graphql';
import { PersonWhereUniqueInput } from '@generated/type-graphql';
import { Context } from '../../../context';
import { PersonType } from '../PersonType';

@Resolver((_of) => PersonType)
export class PersonResolver {
    @Authorized()
    @Query((_returns) => PersonType)
    async person(
        @Arg('where') where: PersonWhereUniqueInput,
        @Ctx() { prisma }: Context<true>,
    ) {
        const data = await prisma.person.findUnique({ where });

        if (!data) throw new ApolloError('User not found!', 'USER_NOT_FOUND');

        return data;
    }
}
