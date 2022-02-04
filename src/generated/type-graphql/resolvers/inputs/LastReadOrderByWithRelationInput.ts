import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationOrderByWithRelationInput } from "../inputs/ConversationOrderByWithRelationInput";
import { PersonOrderByWithRelationInput } from "../inputs/PersonOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LastReadOrderByWithRelationInput", {
  isAbstract: true
})
export class LastReadOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  lastRead?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  personID?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  conversationID?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => PersonOrderByWithRelationInput, {
    nullable: true
  })
  person?: PersonOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => ConversationOrderByWithRelationInput, {
    nullable: true
  })
  conversation?: ConversationOrderByWithRelationInput | undefined;
}
