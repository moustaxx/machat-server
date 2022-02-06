import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateWithoutMessagesInput } from "../inputs/PersonCreateWithoutMessagesInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType("PersonCreateOrConnectWithoutMessagesInput", {
  isAbstract: true
})
export class PersonCreateOrConnectWithoutMessagesInput {
  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: false
  })
  where!: PersonWhereUniqueInput;

  @TypeGraphQL.Field(_type => PersonCreateWithoutMessagesInput, {
    nullable: false
  })
  create!: PersonCreateWithoutMessagesInput;
}
