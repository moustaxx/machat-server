import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";

@TypeGraphQL.InputType("LastReadScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class LastReadScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [LastReadScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: LastReadScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: LastReadScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: LastReadScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  lastRead?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  personID?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  conversationID?: IntWithAggregatesFilter | undefined;
}
