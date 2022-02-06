import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationOrderByRelationAggregateInput } from "../inputs/ConversationOrderByRelationAggregateInput";
import { LastReadOrderByRelationAggregateInput } from "../inputs/LastReadOrderByRelationAggregateInput";
import { MessageOrderByRelationAggregateInput } from "../inputs/MessageOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("PersonOrderByWithRelationInput", {
  isAbstract: true
})
export class PersonOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  email?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  isAdmin?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  lastSeen?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  username?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  hash?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => MessageOrderByRelationAggregateInput, {
    nullable: true
  })
  messages?: MessageOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LastReadOrderByRelationAggregateInput, {
    nullable: true
  })
  lastRead?: LastReadOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ConversationOrderByRelationAggregateInput, {
    nullable: true
  })
  conversations?: ConversationOrderByRelationAggregateInput | undefined;
}
