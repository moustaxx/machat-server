import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationRelationFilter } from "../inputs/ConversationRelationFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";
import { PersonRelationFilter } from "../inputs/PersonRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageWhereInput {
  @TypeGraphQL.Field(_type => [MessageWhereInput], {
    nullable: true
  })
  AND?: MessageWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereInput], {
    nullable: true
  })
  OR?: MessageWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereInput], {
    nullable: true
  })
  NOT?: MessageWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  content?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  authorID?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  conversationID?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => PersonRelationFilter, {
    nullable: true
  })
  author?: PersonRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ConversationRelationFilter, {
    nullable: true
  })
  conversation?: ConversationRelationFilter | undefined;
}
