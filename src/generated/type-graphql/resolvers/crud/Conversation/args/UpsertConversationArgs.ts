import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationCreateInput } from "../../../inputs/ConversationCreateInput";
import { ConversationUpdateInput } from "../../../inputs/ConversationUpdateInput";
import { ConversationWhereUniqueInput } from "../../../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertConversationArgs {
  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: false
  })
  where!: ConversationWhereUniqueInput;

  @TypeGraphQL.Field(_type => ConversationCreateInput, {
    nullable: false
  })
  create!: ConversationCreateInput;

  @TypeGraphQL.Field(_type => ConversationUpdateInput, {
    nullable: false
  })
  update!: ConversationUpdateInput;
}
