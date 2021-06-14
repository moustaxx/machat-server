import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationOrderByInput } from "../../../inputs/ConversationOrderByInput";
import { ConversationWhereInput } from "../../../inputs/ConversationWhereInput";
import { ConversationWhereUniqueInput } from "../../../inputs/ConversationWhereUniqueInput";
import { ConversationScalarFieldEnum } from "../../../../enums/ConversationScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class PersonConversationsArgs {
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

  @TypeGraphQL.Field(_type => [ConversationScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"createdAt" | "id" | "name"> | undefined;
}
