import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Conversation } from "../models/Conversation";
import { LastRead } from "../models/LastRead";
import { Message } from "../models/Message";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class Person {
  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  isAdmin!: boolean;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  lastSeen?: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  username!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  hash!: string;

  messages?: Message[];

  lastRead?: LastRead[];

  conversations?: Conversation[];
}
