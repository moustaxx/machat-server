import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationUpdateInput } from "../../../inputs/ConversationUpdateInput";
import { ConversationWhereUniqueInput } from "../../../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateConversationArgs {
  @TypeGraphQL.Field(_type => ConversationUpdateInput, {
    nullable: false
  })
  data!: ConversationUpdateInput;

  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: false
  })
  where!: ConversationWhereUniqueInput;
}
