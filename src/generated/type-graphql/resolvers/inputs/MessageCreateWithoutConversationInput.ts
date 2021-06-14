import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateNestedOneWithoutMessagesInput } from "../inputs/PersonCreateNestedOneWithoutMessagesInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageCreateWithoutConversationInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  content!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => PersonCreateNestedOneWithoutMessagesInput, {
    nullable: false
  })
  author!: PersonCreateNestedOneWithoutMessagesInput;
}
