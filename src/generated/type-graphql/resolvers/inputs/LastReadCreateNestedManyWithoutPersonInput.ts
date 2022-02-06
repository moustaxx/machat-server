import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateManyPersonInputEnvelope } from "../inputs/LastReadCreateManyPersonInputEnvelope";
import { LastReadCreateOrConnectWithoutPersonInput } from "../inputs/LastReadCreateOrConnectWithoutPersonInput";
import { LastReadCreateWithoutPersonInput } from "../inputs/LastReadCreateWithoutPersonInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType("LastReadCreateNestedManyWithoutPersonInput", {
  isAbstract: true
})
export class LastReadCreateNestedManyWithoutPersonInput {
  @TypeGraphQL.Field(_type => [LastReadCreateWithoutPersonInput], {
    nullable: true
  })
  create?: LastReadCreateWithoutPersonInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadCreateOrConnectWithoutPersonInput], {
    nullable: true
  })
  connectOrCreate?: LastReadCreateOrConnectWithoutPersonInput[] | undefined;

  @TypeGraphQL.Field(_type => LastReadCreateManyPersonInputEnvelope, {
    nullable: true
  })
  createMany?: LastReadCreateManyPersonInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [LastReadWhereUniqueInput], {
    nullable: true
  })
  connect?: LastReadWhereUniqueInput[] | undefined;
}
