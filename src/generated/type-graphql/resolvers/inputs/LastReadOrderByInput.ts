import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationOrderByInput } from "../inputs/ConversationOrderByInput";
import { PersonOrderByInput } from "../inputs/PersonOrderByInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LastReadOrderByInput {
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

  @TypeGraphQL.Field(_type => PersonOrderByInput, {
    nullable: true
  })
  person?: PersonOrderByInput | undefined;

  @TypeGraphQL.Field(_type => ConversationOrderByInput, {
    nullable: true
  })
  conversation?: ConversationOrderByInput | undefined;
}
