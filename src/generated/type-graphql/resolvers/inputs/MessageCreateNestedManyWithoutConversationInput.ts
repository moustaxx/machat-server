import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateManyConversationInputEnvelope } from "../inputs/MessageCreateManyConversationInputEnvelope";
import { MessageCreateOrConnectWithoutConversationInput } from "../inputs/MessageCreateOrConnectWithoutConversationInput";
import { MessageCreateWithoutConversationInput } from "../inputs/MessageCreateWithoutConversationInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType("MessageCreateNestedManyWithoutConversationInput", {
  isAbstract: true
})
export class MessageCreateNestedManyWithoutConversationInput {
  @TypeGraphQL.Field(_type => [MessageCreateWithoutConversationInput], {
    nullable: true
  })
  create?: MessageCreateWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageCreateOrConnectWithoutConversationInput], {
    nullable: true
  })
  connectOrCreate?: MessageCreateOrConnectWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => MessageCreateManyConversationInputEnvelope, {
    nullable: true
  })
  createMany?: MessageCreateManyConversationInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  connect?: MessageWhereUniqueInput[] | undefined;
}
