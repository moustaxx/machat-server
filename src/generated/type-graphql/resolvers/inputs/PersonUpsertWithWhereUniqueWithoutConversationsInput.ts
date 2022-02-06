import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateWithoutConversationsInput } from "../inputs/PersonCreateWithoutConversationsInput";
import { PersonUpdateWithoutConversationsInput } from "../inputs/PersonUpdateWithoutConversationsInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType("PersonUpsertWithWhereUniqueWithoutConversationsInput", {
  isAbstract: true
})
export class PersonUpsertWithWhereUniqueWithoutConversationsInput {
  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: false
  })
  where!: PersonWhereUniqueInput;

  @TypeGraphQL.Field(_type => PersonUpdateWithoutConversationsInput, {
    nullable: false
  })
  update!: PersonUpdateWithoutConversationsInput;

  @TypeGraphQL.Field(_type => PersonCreateWithoutConversationsInput, {
    nullable: false
  })
  create!: PersonCreateWithoutConversationsInput;
}
