import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("PersonScalarWhereInput", {
  isAbstract: true
})
export class PersonScalarWhereInput {
  @TypeGraphQL.Field(_type => [PersonScalarWhereInput], {
    nullable: true
  })
  AND?: PersonScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonScalarWhereInput], {
    nullable: true
  })
  OR?: PersonScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonScalarWhereInput], {
    nullable: true
  })
  NOT?: PersonScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  email?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => BoolFilter, {
    nullable: true
  })
  isAdmin?: BoolFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  lastSeen?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  username?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  hash?: StringFilter | undefined;
}
