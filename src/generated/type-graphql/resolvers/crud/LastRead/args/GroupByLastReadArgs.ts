import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadOrderByWithAggregationInput } from "../../../inputs/LastReadOrderByWithAggregationInput";
import { LastReadScalarWhereWithAggregatesInput } from "../../../inputs/LastReadScalarWhereWithAggregatesInput";
import { LastReadWhereInput } from "../../../inputs/LastReadWhereInput";
import { LastReadScalarFieldEnum } from "../../../../enums/LastReadScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByLastReadArgs {
  @TypeGraphQL.Field(_type => LastReadWhereInput, {
    nullable: true
  })
  where?: LastReadWhereInput | undefined;

  @TypeGraphQL.Field(_type => [LastReadOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: LastReadOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"lastRead" | "personID" | "conversationID">;

  @TypeGraphQL.Field(_type => LastReadScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: LastReadScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
