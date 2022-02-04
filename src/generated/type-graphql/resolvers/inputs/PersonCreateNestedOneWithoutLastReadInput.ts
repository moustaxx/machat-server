import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateOrConnectWithoutLastReadInput } from "../inputs/PersonCreateOrConnectWithoutLastReadInput";
import { PersonCreateWithoutLastReadInput } from "../inputs/PersonCreateWithoutLastReadInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType("PersonCreateNestedOneWithoutLastReadInput", {
  isAbstract: true
})
export class PersonCreateNestedOneWithoutLastReadInput {
  @TypeGraphQL.Field(_type => PersonCreateWithoutLastReadInput, {
    nullable: true
  })
  create?: PersonCreateWithoutLastReadInput | undefined;

  @TypeGraphQL.Field(_type => PersonCreateOrConnectWithoutLastReadInput, {
    nullable: true
  })
  connectOrCreate?: PersonCreateOrConnectWithoutLastReadInput | undefined;

  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: true
  })
  connect?: PersonWhereUniqueInput | undefined;
}
