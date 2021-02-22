import { Ctx, Args, Resolver, Mutation, ArgsType, Field } from 'type-graphql';
import { ValidationError } from 'apollo-server-errors';
import argon2 from 'argon2';

import { Context } from '../../../context';
import { PersonType } from '../PersonType';
import isAlreadyLoggedIn from '../../../helpers/isAlreadyLoggedIn';
import isValidEmail from '../helpers/isValidEmail';

@ArgsType()
class RegisterArgs {
    @Field()
    email!: string;

    @Field()
    username!: string;

    @Field()
    password!: string;
}

@Resolver((_of) => PersonType)
export class RegisterResolver {
    @Mutation((_returns) => PersonType)
    async register(@Args() args: RegisterArgs, @Ctx() { prisma, session }: Context) {
        isAlreadyLoggedIn(session);

        const username = args.username.trim();
        const email = args.email.trim();
        const { password } = args;

        if (username.length <= 3) throw new ValidationError('Username length must be > 3');
        if (username.length > 20) throw new ValidationError('Username length must be > 20');

        if (password.length <= 5) throw new ValidationError('Password length must be > 5');
        if (password.length > 100) throw new ValidationError('Password length must be < 100');

        if (!isValidEmail(email)) throw new ValidationError('Wrong email');

        const hash = await argon2.hash(password);

        const data = await prisma.person.create({
            data: {
                email,
                username,
                hash,
            },
        });

        session.isLoggedIn = true;
        session.owner = data;
        return data;
    }
}
