import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateWithoutConversationInput } from "../inputs/MessageCreateWithoutConversationInput";
import { MessageUpdateWithoutConversationInput } from "../inputs/MessageUpdateWithoutConversationInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType("MessageUpsertWithWhereUniqueWithoutConversationInput", {
  isAbstract: true
})
export class MessageUpsertWithWhereUniqueWithoutConversationInput {
  @TypeGraphQL.Field(_type => MessageWhereUniqueInput, {
    nullable: false
  })
  where!: MessageWhereUniqueInput;

  @TypeGraphQL.Field(_type => MessageUpdateWithoutConversationInput, {
    nullable: false
  })
  update!: MessageUpdateWithoutConversationInput;

  @TypeGraphQL.Field(_type => MessageCreateWithoutConversationInput, {
    nullable: false
  })
  create!: MessageCreateWithoutConversationInput;
}
