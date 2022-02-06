import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("LastReadSumAggregate", {
  isAbstract: true
})
export class LastReadSumAggregate {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  personID!: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  conversationID!: number | null;
}
