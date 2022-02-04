import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateWithoutLastReadInput } from "../inputs/PersonCreateWithoutLastReadInput";
import { PersonUpdateWithoutLastReadInput } from "../inputs/PersonUpdateWithoutLastReadInput";

@TypeGraphQL.InputType("PersonUpsertWithoutLastReadInput", {
  isAbstract: true
})
export class PersonUpsertWithoutLastReadInput {
  @TypeGraphQL.Field(_type => PersonUpdateWithoutLastReadInput, {
    nullable: false
  })
  update!: PersonUpdateWithoutLastReadInput;

  @TypeGraphQL.Field(_type => PersonCreateWithoutLastReadInput, {
    nullable: false
  })
  create!: PersonCreateWithoutLastReadInput;
}
