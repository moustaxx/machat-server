import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationRelationFilter } from "../inputs/ConversationRelationFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";
import { PersonRelationFilter } from "../inputs/PersonRelationFilter";

@TypeGraphQL.InputType("LastReadWhereInput", {
  isAbstract: true
})
export class LastReadWhereInput {
  @TypeGraphQL.Field(_type => [LastReadWhereInput], {
    nullable: true
  })
  AND?: LastReadWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadWhereInput], {
    nullable: true
  })
  OR?: LastReadWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadWhereInput], {
    nullable: true
  })
  NOT?: LastReadWhereInput[] | undefined;

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

  @TypeGraphQL.Field(_type => PersonRelationFilter, {
    nullable: true
  })
  person?: PersonRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ConversationRelationFilter, {
    nullable: true
  })
  conversation?: ConversationRelationFilter | undefined;
}
