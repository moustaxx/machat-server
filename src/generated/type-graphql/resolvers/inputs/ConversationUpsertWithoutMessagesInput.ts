import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateWithoutMessagesInput } from "../inputs/ConversationCreateWithoutMessagesInput";
import { ConversationUpdateWithoutMessagesInput } from "../inputs/ConversationUpdateWithoutMessagesInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ConversationUpsertWithoutMessagesInput {
  @TypeGraphQL.Field(_type => ConversationUpdateWithoutMessagesInput, {
    nullable: false
  })
  update!: ConversationUpdateWithoutMessagesInput;

  @TypeGraphQL.Field(_type => ConversationCreateWithoutMessagesInput, {
    nullable: false
  })
  create!: ConversationCreateWithoutMessagesInput;
}
