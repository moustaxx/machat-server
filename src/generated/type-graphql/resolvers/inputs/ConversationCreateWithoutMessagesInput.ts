import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateNestedManyWithoutConversationInput } from "../inputs/LastReadCreateNestedManyWithoutConversationInput";
import { PersonCreateNestedManyWithoutConversationsInput } from "../inputs/PersonCreateNestedManyWithoutConversationsInput";

@TypeGraphQL.InputType("ConversationCreateWithoutMessagesInput", {
  isAbstract: true
})
export class ConversationCreateWithoutMessagesInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => LastReadCreateNestedManyWithoutConversationInput, {
    nullable: true
  })
  lastRead?: LastReadCreateNestedManyWithoutConversationInput | undefined;

  @TypeGraphQL.Field(_type => PersonCreateNestedManyWithoutConversationsInput, {
    nullable: true
  })
  participants?: PersonCreateNestedManyWithoutConversationsInput | undefined;
}
