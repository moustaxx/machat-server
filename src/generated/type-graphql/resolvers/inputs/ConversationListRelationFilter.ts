import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationWhereInput } from "../inputs/ConversationWhereInput";

@TypeGraphQL.InputType("ConversationListRelationFilter", {
  isAbstract: true
})
export class ConversationListRelationFilter {
  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  every?: ConversationWhereInput | undefined;

  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  some?: ConversationWhereInput | undefined;

  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  none?: ConversationWhereInput | undefined;
}
