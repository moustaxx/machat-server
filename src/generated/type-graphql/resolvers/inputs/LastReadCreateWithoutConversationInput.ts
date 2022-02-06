import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateNestedOneWithoutLastReadInput } from "../inputs/PersonCreateNestedOneWithoutLastReadInput";

@TypeGraphQL.InputType("LastReadCreateWithoutConversationInput", {
  isAbstract: true
})
export class LastReadCreateWithoutConversationInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  lastRead!: Date;

  @TypeGraphQL.Field(_type => PersonCreateNestedOneWithoutLastReadInput, {
    nullable: false
  })
  person!: PersonCreateNestedOneWithoutLastReadInput;
}
