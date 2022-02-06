import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateWithoutMessagesInput } from "../inputs/PersonCreateWithoutMessagesInput";
import { PersonUpdateWithoutMessagesInput } from "../inputs/PersonUpdateWithoutMessagesInput";

@TypeGraphQL.InputType("PersonUpsertWithoutMessagesInput", {
  isAbstract: true
})
export class PersonUpsertWithoutMessagesInput {
  @TypeGraphQL.Field(_type => PersonUpdateWithoutMessagesInput, {
    nullable: false
  })
  update!: PersonUpdateWithoutMessagesInput;

  @TypeGraphQL.Field(_type => PersonCreateWithoutMessagesInput, {
    nullable: false
  })
  create!: PersonCreateWithoutMessagesInput;
}
