import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("ConversationScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class ConversationScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [ConversationScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: ConversationScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: ConversationScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: ConversationScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  createdAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  name?: StringWithAggregatesFilter | undefined;
}
