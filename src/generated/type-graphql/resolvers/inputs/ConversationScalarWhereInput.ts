import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ConversationScalarWhereInput {
  @TypeGraphQL.Field(_type => [ConversationScalarWhereInput], {
    nullable: true
  })
  AND?: ConversationScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationScalarWhereInput], {
    nullable: true
  })
  OR?: ConversationScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationScalarWhereInput], {
    nullable: true
  })
  NOT?: ConversationScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  name?: StringFilter | undefined;
}
