import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationWhereUniqueInput } from "../../../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueConversationArgs {
  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: false
  })
  where!: ConversationWhereUniqueInput;
}
