import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadAvgOrderByAggregateInput } from "../inputs/LastReadAvgOrderByAggregateInput";
import { LastReadCountOrderByAggregateInput } from "../inputs/LastReadCountOrderByAggregateInput";
import { LastReadMaxOrderByAggregateInput } from "../inputs/LastReadMaxOrderByAggregateInput";
import { LastReadMinOrderByAggregateInput } from "../inputs/LastReadMinOrderByAggregateInput";
import { LastReadSumOrderByAggregateInput } from "../inputs/LastReadSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LastReadOrderByWithAggregationInput", {
  isAbstract: true
})
export class LastReadOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  lastRead?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  personID?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  conversationID?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => LastReadCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: LastReadCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LastReadAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: LastReadAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LastReadMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: LastReadMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LastReadMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: LastReadMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LastReadSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: LastReadSumOrderByAggregateInput | undefined;
}
