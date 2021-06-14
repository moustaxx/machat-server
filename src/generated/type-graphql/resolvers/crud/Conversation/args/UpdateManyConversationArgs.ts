import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationUpdateManyMutationInput } from "../../../inputs/ConversationUpdateManyMutationInput";
import { ConversationWhereInput } from "../../../inputs/ConversationWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyConversationArgs {
  @TypeGraphQL.Field(_type => ConversationUpdateManyMutationInput, {
    nullable: false
  })
  data!: ConversationUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  where?: ConversationWhereInput | undefined;
}
