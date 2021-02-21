import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Conversation } from "../models/Conversation";
import { Person } from "../models/Person";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class LastRead {
  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  lastRead!: Date;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  personID!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  conversationID!: number;

  person?: Person;

  conversation?: Conversation;
}
