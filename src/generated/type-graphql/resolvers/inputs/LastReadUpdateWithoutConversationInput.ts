import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { PersonUpdateOneRequiredWithoutLastReadInput } from "../inputs/PersonUpdateOneRequiredWithoutLastReadInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LastReadUpdateWithoutConversationInput {
  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  lastRead?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => PersonUpdateOneRequiredWithoutLastReadInput, {
    nullable: true
  })
  person?: PersonUpdateOneRequiredWithoutLastReadInput | undefined;
}
