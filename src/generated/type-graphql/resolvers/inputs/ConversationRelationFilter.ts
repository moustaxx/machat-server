import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationWhereInput } from "../inputs/ConversationWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ConversationRelationFilter {
  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  is?: ConversationWhereInput | undefined;

  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  isNot?: ConversationWhereInput | undefined;
}
