import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateManyPersonInputEnvelope } from "../inputs/LastReadCreateManyPersonInputEnvelope";
import { LastReadCreateOrConnectWithoutPersonInput } from "../inputs/LastReadCreateOrConnectWithoutPersonInput";
import { LastReadCreateWithoutPersonInput } from "../inputs/LastReadCreateWithoutPersonInput";
import { LastReadScalarWhereInput } from "../inputs/LastReadScalarWhereInput";
import { LastReadUpdateManyWithWhereWithoutPersonInput } from "../inputs/LastReadUpdateManyWithWhereWithoutPersonInput";
import { LastReadUpdateWithWhereUniqueWithoutPersonInput } from "../inputs/LastReadUpdateWithWhereUniqueWithoutPersonInput";
import { LastReadUpsertWithWhereUniqueWithoutPersonInput } from "../inputs/LastReadUpsertWithWhereUniqueWithoutPersonInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType("LastReadUpdateManyWithoutPersonInput", {
  isAbstract: true
})
export class LastReadUpdateManyWithoutPersonInput {
  @TypeGraphQL.Field(_type => [LastReadCreateWithoutPersonInput], {
    nullable: true
  })
  create?: LastReadCreateWithoutPersonInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadCreateOrConnectWithoutPersonInput], {
    nullable: true
  })
  connectOrCreate?: LastReadCreateOrConnectWithoutPersonInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadUpsertWithWhereUniqueWithoutPersonInput], {
    nullable: true
  })
  upsert?: LastReadUpsertWithWhereUniqueWithoutPersonInput[] | undefined;

  @TypeGraphQL.Field(_type => LastReadCreateManyPersonInputEnvelope, {
    nullable: true
  })
  createMany?: LastReadCreateManyPersonInputEnvelope | undefined;

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

  @TypeGraphQL.Field(_type => [LastReadUpdateWithWhereUniqueWithoutPersonInput], {
    nullable: true
  })
  update?: LastReadUpdateWithWhereUniqueWithoutPersonInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadUpdateManyWithWhereWithoutPersonInput], {
    nullable: true
  })
  updateMany?: LastReadUpdateManyWithWhereWithoutPersonInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadScalarWhereInput], {
    nullable: true
  })
  deleteMany?: LastReadScalarWhereInput[] | undefined;
}
