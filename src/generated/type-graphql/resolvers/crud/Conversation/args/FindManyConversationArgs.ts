import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationOrderByWithRelationInput } from "../../../inputs/ConversationOrderByWithRelationInput";
import { ConversationWhereInput } from "../../../inputs/ConversationWhereInput";
import { ConversationWhereUniqueInput } from "../../../inputs/ConversationWhereUniqueInput";
import { ConversationScalarFieldEnum } from "../../../../enums/ConversationScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyConversationArgs {
  @TypeGraphQL.Field(_type => ConversationWhereInput, {
    nullable: true
  })
  where?: ConversationWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ConversationOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: ConversationOrderByWithRelationInput[] | undefined;

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
