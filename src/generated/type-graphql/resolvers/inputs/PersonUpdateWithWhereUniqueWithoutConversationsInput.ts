import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { PersonUpdateWithoutConversationsInput } from "../inputs/PersonUpdateWithoutConversationsInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType("PersonUpdateWithWhereUniqueWithoutConversationsInput", {
  isAbstract: true
})
export class PersonUpdateWithWhereUniqueWithoutConversationsInput {
  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: false
  })
  where!: PersonWhereUniqueInput;

  @TypeGraphQL.Field(_type => PersonUpdateWithoutConversationsInput, {
    nullable: false
  })
  data!: PersonUpdateWithoutConversationsInput;
}
