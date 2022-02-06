import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { JsonWithAggregatesFilter } from "../inputs/JsonWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("SessionScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class SessionScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [SessionScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: SessionScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [SessionScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: SessionScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [SessionScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: SessionScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  sid?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => JsonWithAggregatesFilter, {
    nullable: true
  })
  sess?: JsonWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  expire?: DateTimeWithAggregatesFilter | undefined;
}
