import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";

@TypeGraphQL.InputType("LastReadScalarWhereInput", {
  isAbstract: true
})
export class LastReadScalarWhereInput {
  @TypeGraphQL.Field(_type => [LastReadScalarWhereInput], {
    nullable: true
  })
  AND?: LastReadScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadScalarWhereInput], {
    nullable: true
  })
  OR?: LastReadScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadScalarWhereInput], {
    nullable: true
  })
  NOT?: LastReadScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  lastRead?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  personID?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  conversationID?: IntFilter | undefined;
}
