import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateNestedManyWithoutConversationInput } from "../inputs/MessageCreateNestedManyWithoutConversationInput";
import { PersonCreateNestedManyWithoutConversationsInput } from "../inputs/PersonCreateNestedManyWithoutConversationsInput";

@TypeGraphQL.InputType("ConversationCreateWithoutLastReadInput", {
  isAbstract: true
})
export class ConversationCreateWithoutLastReadInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => MessageCreateNestedManyWithoutConversationInput, {
    nullable: true
  })
  messages?: MessageCreateNestedManyWithoutConversationInput | undefined;

  @TypeGraphQL.Field(_type => PersonCreateNestedManyWithoutConversationsInput, {
    nullable: true
  })
  participants?: PersonCreateNestedManyWithoutConversationsInput | undefined;
}
