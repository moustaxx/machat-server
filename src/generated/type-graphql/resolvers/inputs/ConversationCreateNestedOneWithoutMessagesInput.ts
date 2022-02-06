import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateOrConnectWithoutMessagesInput } from "../inputs/ConversationCreateOrConnectWithoutMessagesInput";
import { ConversationCreateWithoutMessagesInput } from "../inputs/ConversationCreateWithoutMessagesInput";
import { ConversationWhereUniqueInput } from "../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.InputType("ConversationCreateNestedOneWithoutMessagesInput", {
  isAbstract: true
})
export class ConversationCreateNestedOneWithoutMessagesInput {
  @TypeGraphQL.Field(_type => ConversationCreateWithoutMessagesInput, {
    nullable: true
  })
  create?: ConversationCreateWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => ConversationCreateOrConnectWithoutMessagesInput, {
    nullable: true
  })
  connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: true
  })
  connect?: ConversationWhereUniqueInput | undefined;
}
