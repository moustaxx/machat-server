import { Ctx, Args, Resolver, Mutation, ArgsType, Field } from 'type-graphql';
import { ApolloError } from 'apollo-server-errors';
import argon2 from 'argon2';

import { Context } from '../../../context';
import { PersonType } from '../PersonType';
import throwErrorWhenAlreadyLoggedIn from '../../../helpers/throwErrorWhenAlreadyLoggedIn';

const wrongCredentialsError = new ApolloError('Wrong username or password!', 'WRONG_CREDENTIALS');

@ArgsType()
class LoginArgs {
    @Field()
    username!: string;

    @Field()
    password!: string;
}

@Resolver((_of) => PersonType)
export class LoginResolver {
    @Mutation((_returns) => PersonType)
    async login(@Args() args: LoginArgs, @Ctx() { prisma, session }: Context) {
        throwErrorWhenAlreadyLoggedIn(session);

        const username = args.username.trim();

        const data = await prisma.person.findUnique({ where: { username } });
        if (!data) throw wrongCredentialsError;

        const isVerified = await argon2.verify(data.hash, args.password); // TODO
        if (!isVerified) throw wrongCredentialsError;

        session.isLoggedIn = true;
        session.owner = data;

        return data;
    }
}
