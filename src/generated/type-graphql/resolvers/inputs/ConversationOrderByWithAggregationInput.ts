import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationAvgOrderByAggregateInput } from "../inputs/ConversationAvgOrderByAggregateInput";
import { ConversationCountOrderByAggregateInput } from "../inputs/ConversationCountOrderByAggregateInput";
import { ConversationMaxOrderByAggregateInput } from "../inputs/ConversationMaxOrderByAggregateInput";
import { ConversationMinOrderByAggregateInput } from "../inputs/ConversationMinOrderByAggregateInput";
import { ConversationSumOrderByAggregateInput } from "../inputs/ConversationSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ConversationOrderByWithAggregationInput", {
  isAbstract: true
})
export class ConversationOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => ConversationCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: ConversationCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ConversationAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: ConversationAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ConversationMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: ConversationMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ConversationMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: ConversationMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ConversationSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: ConversationSumOrderByAggregateInput | undefined;
}
