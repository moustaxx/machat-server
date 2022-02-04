import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateOrConnectWithoutLastReadInput } from "../inputs/PersonCreateOrConnectWithoutLastReadInput";
import { PersonCreateWithoutLastReadInput } from "../inputs/PersonCreateWithoutLastReadInput";
import { PersonUpdateWithoutLastReadInput } from "../inputs/PersonUpdateWithoutLastReadInput";
import { PersonUpsertWithoutLastReadInput } from "../inputs/PersonUpsertWithoutLastReadInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType("PersonUpdateOneRequiredWithoutLastReadInput", {
  isAbstract: true
})
export class PersonUpdateOneRequiredWithoutLastReadInput {
  @TypeGraphQL.Field(_type => PersonCreateWithoutLastReadInput, {
    nullable: true
  })
  create?: PersonCreateWithoutLastReadInput | undefined;

  @TypeGraphQL.Field(_type => PersonCreateOrConnectWithoutLastReadInput, {
    nullable: true
  })
  connectOrCreate?: PersonCreateOrConnectWithoutLastReadInput | undefined;

  @TypeGraphQL.Field(_type => PersonUpsertWithoutLastReadInput, {
    nullable: true
  })
  upsert?: PersonUpsertWithoutLastReadInput | undefined;

  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: true
  })
  connect?: PersonWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => PersonUpdateWithoutLastReadInput, {
    nullable: true
  })
  update?: PersonUpdateWithoutLastReadInput | undefined;
}
