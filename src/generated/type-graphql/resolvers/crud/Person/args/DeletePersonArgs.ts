import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PersonWhereUniqueInput } from "../../../inputs/PersonWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeletePersonArgs {
  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: false
  })
  where!: PersonWhereUniqueInput;
}
