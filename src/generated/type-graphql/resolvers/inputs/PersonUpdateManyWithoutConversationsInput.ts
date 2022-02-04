import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateOrConnectWithoutConversationsInput } from "../inputs/PersonCreateOrConnectWithoutConversationsInput";
import { PersonCreateWithoutConversationsInput } from "../inputs/PersonCreateWithoutConversationsInput";
import { PersonScalarWhereInput } from "../inputs/PersonScalarWhereInput";
import { PersonUpdateManyWithWhereWithoutConversationsInput } from "../inputs/PersonUpdateManyWithWhereWithoutConversationsInput";
import { PersonUpdateWithWhereUniqueWithoutConversationsInput } from "../inputs/PersonUpdateWithWhereUniqueWithoutConversationsInput";
import { PersonUpsertWithWhereUniqueWithoutConversationsInput } from "../inputs/PersonUpsertWithWhereUniqueWithoutConversationsInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType("PersonUpdateManyWithoutConversationsInput", {
  isAbstract: true
})
export class PersonUpdateManyWithoutConversationsInput {
  @TypeGraphQL.Field(_type => [PersonCreateWithoutConversationsInput], {
    nullable: true
  })
  create?: PersonCreateWithoutConversationsInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonCreateOrConnectWithoutConversationsInput], {
    nullable: true
  })
  connectOrCreate?: PersonCreateOrConnectWithoutConversationsInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonUpsertWithWhereUniqueWithoutConversationsInput], {
    nullable: true
  })
  upsert?: PersonUpsertWithWhereUniqueWithoutConversationsInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonWhereUniqueInput], {
    nullable: true
  })
  set?: PersonWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonWhereUniqueInput], {
    nullable: true
  })
  disconnect?: PersonWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonWhereUniqueInput], {
    nullable: true
  })
  delete?: PersonWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonWhereUniqueInput], {
    nullable: true
  })
  connect?: PersonWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonUpdateWithWhereUniqueWithoutConversationsInput], {
    nullable: true
  })
  update?: PersonUpdateWithWhereUniqueWithoutConversationsInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonUpdateManyWithWhereWithoutConversationsInput], {
    nullable: true
  })
  updateMany?: PersonUpdateManyWithWhereWithoutConversationsInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonScalarWhereInput], {
    nullable: true
  })
  deleteMany?: PersonScalarWhereInput[] | undefined;
}
