import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationUpdateOneRequiredWithoutLastReadInput } from "../inputs/ConversationUpdateOneRequiredWithoutLastReadInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { PersonUpdateOneRequiredWithoutLastReadInput } from "../inputs/PersonUpdateOneRequiredWithoutLastReadInput";

@TypeGraphQL.InputType("LastReadUpdateInput", {
  isAbstract: true
})
export class LastReadUpdateInput {
  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  lastRead?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => PersonUpdateOneRequiredWithoutLastReadInput, {
    nullable: true
  })
  person?: PersonUpdateOneRequiredWithoutLastReadInput | undefined;

  @TypeGraphQL.Field(_type => ConversationUpdateOneRequiredWithoutLastReadInput, {
    nullable: true
  })
  conversation?: ConversationUpdateOneRequiredWithoutLastReadInput | undefined;
}
