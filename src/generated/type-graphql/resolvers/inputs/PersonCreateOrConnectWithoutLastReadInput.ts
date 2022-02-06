import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateWithoutLastReadInput } from "../inputs/PersonCreateWithoutLastReadInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType("PersonCreateOrConnectWithoutLastReadInput", {
  isAbstract: true
})
export class PersonCreateOrConnectWithoutLastReadInput {
  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: false
  })
  where!: PersonWhereUniqueInput;

  @TypeGraphQL.Field(_type => PersonCreateWithoutLastReadInput, {
    nullable: false
  })
  create!: PersonCreateWithoutLastReadInput;
}
