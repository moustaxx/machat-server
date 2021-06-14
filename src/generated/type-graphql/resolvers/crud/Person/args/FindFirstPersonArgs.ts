import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PersonOrderByInput } from "../../../inputs/PersonOrderByInput";
import { PersonWhereInput } from "../../../inputs/PersonWhereInput";
import { PersonWhereUniqueInput } from "../../../inputs/PersonWhereUniqueInput";
import { PersonScalarFieldEnum } from "../../../../enums/PersonScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstPersonArgs {
  @TypeGraphQL.Field(_type => PersonWhereInput, {
    nullable: true
  })
  where?: PersonWhereInput | undefined;

  @TypeGraphQL.Field(_type => [PersonOrderByInput], {
    nullable: true
  })
  orderBy?: PersonOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: true
  })
  cursor?: PersonWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [PersonScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"createdAt" | "email" | "id" | "isAdmin" | "lastSeen" | "username" | "hash"> | undefined;
}
