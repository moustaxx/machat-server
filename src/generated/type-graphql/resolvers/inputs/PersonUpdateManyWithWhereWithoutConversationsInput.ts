import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { PersonScalarWhereInput } from "../inputs/PersonScalarWhereInput";
import { PersonUpdateManyMutationInput } from "../inputs/PersonUpdateManyMutationInput";

@TypeGraphQL.InputType("PersonUpdateManyWithWhereWithoutConversationsInput", {
  isAbstract: true
})
export class PersonUpdateManyWithWhereWithoutConversationsInput {
  @TypeGraphQL.Field(_type => PersonScalarWhereInput, {
    nullable: false
  })
  where!: PersonScalarWhereInput;

  @TypeGraphQL.Field(_type => PersonUpdateManyMutationInput, {
    nullable: false
  })
  data!: PersonUpdateManyMutationInput;
}
