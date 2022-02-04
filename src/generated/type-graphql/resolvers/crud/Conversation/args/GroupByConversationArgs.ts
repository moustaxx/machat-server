import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationOrderByWithAggregationInput } from "../../../inputs/ConversationOrderByWithAggregationInput";
import { ConversationScalarWhereWithAggregatesInput } from "../../../inputs/ConversationScalarWhereWithAggregatesInput";
import { ConversationWhereInput } from "../../../inputs/ConversationWhereInput";
import { ConversationScalarFieldEnum } from "../../../../enums/ConversationScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByConversationArgs {
  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  where?: ConversationWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ConversationOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: ConversationOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"createdAt" | "id" | "name">;

  @TypeGraphQL.Field(_type => ConversationScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: ConversationScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
