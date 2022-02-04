import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationOrderByWithRelationInput } from "../inputs/ConversationOrderByWithRelationInput";
import { PersonOrderByWithRelationInput } from "../inputs/PersonOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("MessageOrderByWithRelationInput", {
  isAbstract: true
})
export class MessageOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  content?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  authorID?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  conversationID?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => PersonOrderByWithRelationInput, {
    nullable: true
  })
  author?: PersonOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => ConversationOrderByWithRelationInput, {
    nullable: true
  })
  conversation?: ConversationOrderByWithRelationInput | undefined;
}
