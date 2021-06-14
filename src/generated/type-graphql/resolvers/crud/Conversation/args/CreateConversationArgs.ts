import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationCreateInput } from "../../../inputs/ConversationCreateInput";

@TypeGraphQL.ArgsType()
export class CreateConversationArgs {
  @TypeGraphQL.Field(_type => ConversationCreateInput, {
    nullable: false
  })
  data!: ConversationCreateInput;
}
