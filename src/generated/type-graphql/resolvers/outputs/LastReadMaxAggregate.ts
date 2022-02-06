import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("LastReadMaxAggregate", {
  isAbstract: true
})
export class LastReadMaxAggregate {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  lastRead!: Date | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  personID!: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  conversationID!: number | null;
}
