import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateManyAuthorInputEnvelope } from "../inputs/MessageCreateManyAuthorInputEnvelope";
import { MessageCreateOrConnectWithoutAuthorInput } from "../inputs/MessageCreateOrConnectWithoutAuthorInput";
import { MessageCreateWithoutAuthorInput } from "../inputs/MessageCreateWithoutAuthorInput";
import { MessageScalarWhereInput } from "../inputs/MessageScalarWhereInput";
import { MessageUpdateManyWithWhereWithoutAuthorInput } from "../inputs/MessageUpdateManyWithWhereWithoutAuthorInput";
import { MessageUpdateWithWhereUniqueWithoutAuthorInput } from "../inputs/MessageUpdateWithWhereUniqueWithoutAuthorInput";
import { MessageUpsertWithWhereUniqueWithoutAuthorInput } from "../inputs/MessageUpsertWithWhereUniqueWithoutAuthorInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType("MessageUpdateManyWithoutAuthorInput", {
  isAbstract: true
})
export class MessageUpdateManyWithoutAuthorInput {
  @TypeGraphQL.Field(_type => [MessageCreateWithoutAuthorInput], {
    nullable: true
  })
  create?: MessageCreateWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageCreateOrConnectWithoutAuthorInput], {
    nullable: true
  })
  connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpsertWithWhereUniqueWithoutAuthorInput], {
    nullable: true
  })
  upsert?: MessageUpsertWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => MessageCreateManyAuthorInputEnvelope, {
    nullable: true
  })
  createMany?: MessageCreateManyAuthorInputEnvelope | undefined;

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

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  connect?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpdateWithWhereUniqueWithoutAuthorInput], {
    nullable: true
  })
  update?: MessageUpdateWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpdateManyWithWhereWithoutAuthorInput], {
    nullable: true
  })
  updateMany?: MessageUpdateManyWithWhereWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageScalarWhereInput], {
    nullable: true
  })
  deleteMany?: MessageScalarWhereInput[] | undefined;
}
