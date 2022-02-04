import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MessageUpdateWithoutConversationInput } from "../inputs/MessageUpdateWithoutConversationInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType("MessageUpdateWithWhereUniqueWithoutConversationInput", {
  isAbstract: true
})
export class MessageUpdateWithWhereUniqueWithoutConversationInput {
  @TypeGraphQL.Field(_type => MessageWhereUniqueInput, {
    nullable: false
  })
  where!: MessageWhereUniqueInput;

  @TypeGraphQL.Field(_type => MessageUpdateWithoutConversationInput, {
    nullable: false
  })
  data!: MessageUpdateWithoutConversationInput;
}
