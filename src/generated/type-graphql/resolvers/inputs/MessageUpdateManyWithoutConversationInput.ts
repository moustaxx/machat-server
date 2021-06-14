import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateOrConnectWithoutConversationInput } from "../inputs/MessageCreateOrConnectWithoutConversationInput";
import { MessageCreateWithoutConversationInput } from "../inputs/MessageCreateWithoutConversationInput";
import { MessageScalarWhereInput } from "../inputs/MessageScalarWhereInput";
import { MessageUpdateManyWithWhereWithoutConversationInput } from "../inputs/MessageUpdateManyWithWhereWithoutConversationInput";
import { MessageUpdateWithWhereUniqueWithoutConversationInput } from "../inputs/MessageUpdateWithWhereUniqueWithoutConversationInput";
import { MessageUpsertWithWhereUniqueWithoutConversationInput } from "../inputs/MessageUpsertWithWhereUniqueWithoutConversationInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageUpdateManyWithoutConversationInput {
  @TypeGraphQL.Field(_type => [MessageCreateWithoutConversationInput], {
    nullable: true
  })
  create?: MessageCreateWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageCreateOrConnectWithoutConversationInput], {
    nullable: true
  })
  connectOrCreate?: MessageCreateOrConnectWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpsertWithWhereUniqueWithoutConversationInput], {
    nullable: true
  })
  upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  connect?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  set?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  disconnect?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  delete?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpdateWithWhereUniqueWithoutConversationInput], {
    nullable: true
  })
  update?: MessageUpdateWithWhereUniqueWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpdateManyWithWhereWithoutConversationInput], {
    nullable: true
  })
  updateMany?: MessageUpdateManyWithWhereWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageScalarWhereInput], {
    nullable: true
  })
  deleteMany?: MessageScalarWhereInput[] | undefined;
}
