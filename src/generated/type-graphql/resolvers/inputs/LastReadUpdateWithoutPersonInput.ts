import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationUpdateOneRequiredWithoutLastReadInput } from "../inputs/ConversationUpdateOneRequiredWithoutLastReadInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";

@TypeGraphQL.InputType("LastReadUpdateWithoutPersonInput", {
  isAbstract: true
})
export class LastReadUpdateWithoutPersonInput {
  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  lastRead?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => ConversationUpdateOneRequiredWithoutLastReadInput, {
    nullable: true
  })
  conversation?: ConversationUpdateOneRequiredWithoutLastReadInput | undefined;
}
