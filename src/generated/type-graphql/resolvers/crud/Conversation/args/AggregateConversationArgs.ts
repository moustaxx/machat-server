import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationOrderByInput } from "../../../inputs/ConversationOrderByInput";
import { ConversationWhereInput } from "../../../inputs/ConversationWhereInput";
import { ConversationWhereUniqueInput } from "../../../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateConversationArgs {
  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  where?: ConversationWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ConversationOrderByInput], {
    nullable: true
  })
  orderBy?: ConversationOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: true
  })
  cursor?: ConversationWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
