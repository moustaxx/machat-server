import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateWithoutMessagesInput } from "../inputs/ConversationCreateWithoutMessagesInput";
import { ConversationWhereUniqueInput } from "../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ConversationCreateOrConnectWithoutMessagesInput {
  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: false
  })
  where!: ConversationWhereUniqueInput;

  @TypeGraphQL.Field(_type => ConversationCreateWithoutMessagesInput, {
    nullable: false
  })
  create!: ConversationCreateWithoutMessagesInput;
}
