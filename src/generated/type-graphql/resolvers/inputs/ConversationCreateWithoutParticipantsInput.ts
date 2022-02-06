import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateNestedManyWithoutConversationInput } from "../inputs/LastReadCreateNestedManyWithoutConversationInput";
import { MessageCreateNestedManyWithoutConversationInput } from "../inputs/MessageCreateNestedManyWithoutConversationInput";

@TypeGraphQL.InputType("ConversationCreateWithoutParticipantsInput", {
  isAbstract: true
})
export class ConversationCreateWithoutParticipantsInput {
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

  @TypeGraphQL.Field(_type => LastReadCreateNestedManyWithoutConversationInput, {
    nullable: true
  })
  lastRead?: LastReadCreateNestedManyWithoutConversationInput | undefined;
}
