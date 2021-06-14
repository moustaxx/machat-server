import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationWhereInput } from "../../../inputs/ConversationWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyConversationArgs {
  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  where?: ConversationWhereInput | undefined;
}
