import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { SessionCountOrderByAggregateInput } from "../inputs/SessionCountOrderByAggregateInput";
import { SessionMaxOrderByAggregateInput } from "../inputs/SessionMaxOrderByAggregateInput";
import { SessionMinOrderByAggregateInput } from "../inputs/SessionMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("SessionOrderByWithAggregationInput", {
  isAbstract: true
})
export class SessionOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  sid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  sess?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  expire?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SessionCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: SessionCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SessionMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: SessionMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SessionMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: SessionMinOrderByAggregateInput | undefined;
}
