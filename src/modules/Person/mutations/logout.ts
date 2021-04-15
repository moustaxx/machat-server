import { Ctx, Resolver, Mutation, Authorized } from 'type-graphql';

import { Context } from '../../../context';
import { PersonType } from '../PersonType';

@Resolver((_of) => PersonType)
export class LogoutResolver {
    @Authorized()
    @Mutation((_returns) => PersonType)
    logout(@Ctx() { session, reply, prisma, clientID }: Context<true>) {
        session.delete();

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        reply.setCookie('loggedIn', '0');

        return prisma.person.findUnique({ where: { id: clientID } });
    }
}
