import { ConnectionArguments } from '@devoxa/prisma-relay-cursor-connection';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class ConnectionArgs implements ConnectionArguments {
    @Field((_type) => Int, { nullable: true })
    first?: number | null;

    @Field((_type) => String, { nullable: true })
    after?: string | null;

    @Field((_type) => Int, { nullable: true })
    last?: number | null;

    @Field((_type) => String, { nullable: true })
    before?: string | null;
}
