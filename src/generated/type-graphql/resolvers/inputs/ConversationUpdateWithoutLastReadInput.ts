import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { MessageUpdateManyWithoutConversationInput } from "../inputs/MessageUpdateManyWithoutConversationInput";
import { PersonUpdateManyWithoutConversationsInput } from "../inputs/PersonUpdateManyWithoutConversationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("ConversationUpdateWithoutLastReadInput", {
  isAbstract: true
})
export class ConversationUpdateWithoutLastReadInput {
  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => MessageUpdateManyWithoutConversationInput, {
    nullable: true
  })
  messages?: MessageUpdateManyWithoutConversationInput | undefined;

  @TypeGraphQL.Field(_type => PersonUpdateManyWithoutConversationsInput, {
    nullable: true
  })
  participants?: PersonUpdateManyWithoutConversationsInput | undefined;
}
