import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationUpdateOneRequiredWithoutMessagesInput } from "../inputs/ConversationUpdateOneRequiredWithoutMessagesInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { PersonUpdateOneRequiredWithoutMessagesInput } from "../inputs/PersonUpdateOneRequiredWithoutMessagesInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("MessageUpdateInput", {
  isAbstract: true
})
export class MessageUpdateInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  content?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => PersonUpdateOneRequiredWithoutMessagesInput, {
    nullable: true
  })
  author?: PersonUpdateOneRequiredWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => ConversationUpdateOneRequiredWithoutMessagesInput, {
    nullable: true
  })
  conversation?: ConversationUpdateOneRequiredWithoutMessagesInput | undefined;
}
