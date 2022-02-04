import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateManyConversationInputEnvelope } from "../inputs/LastReadCreateManyConversationInputEnvelope";
import { LastReadCreateOrConnectWithoutConversationInput } from "../inputs/LastReadCreateOrConnectWithoutConversationInput";
import { LastReadCreateWithoutConversationInput } from "../inputs/LastReadCreateWithoutConversationInput";
import { LastReadScalarWhereInput } from "../inputs/LastReadScalarWhereInput";
import { LastReadUpdateManyWithWhereWithoutConversationInput } from "../inputs/LastReadUpdateManyWithWhereWithoutConversationInput";
import { LastReadUpdateWithWhereUniqueWithoutConversationInput } from "../inputs/LastReadUpdateWithWhereUniqueWithoutConversationInput";
import { LastReadUpsertWithWhereUniqueWithoutConversationInput } from "../inputs/LastReadUpsertWithWhereUniqueWithoutConversationInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType("LastReadUpdateManyWithoutConversationInput", {
  isAbstract: true
})
export class LastReadUpdateManyWithoutConversationInput {
  @TypeGraphQL.Field(_type => [LastReadCreateWithoutConversationInput], {
    nullable: true
  })
  create?: LastReadCreateWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadCreateOrConnectWithoutConversationInput], {
    nullable: true
  })
  connectOrCreate?: LastReadCreateOrConnectWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadUpsertWithWhereUniqueWithoutConversationInput], {
    nullable: true
  })
  upsert?: LastReadUpsertWithWhereUniqueWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => LastReadCreateManyConversationInputEnvelope, {
    nullable: true
  })
  createMany?: LastReadCreateManyConversationInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [LastReadWhereUniqueInput], {
    nullable: true
  })
  set?: LastReadWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadWhereUniqueInput], {
    nullable: true
  })
  disconnect?: LastReadWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadWhereUniqueInput], {
    nullable: true
  })
  delete?: LastReadWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadWhereUniqueInput], {
    nullable: true
  })
  connect?: LastReadWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadUpdateWithWhereUniqueWithoutConversationInput], {
    nullable: true
  })
  update?: LastReadUpdateWithWhereUniqueWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadUpdateManyWithWhereWithoutConversationInput], {
    nullable: true
  })
  updateMany?: LastReadUpdateManyWithWhereWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadScalarWhereInput], {
    nullable: true
  })
  deleteMany?: LastReadScalarWhereInput[] | undefined;
}
