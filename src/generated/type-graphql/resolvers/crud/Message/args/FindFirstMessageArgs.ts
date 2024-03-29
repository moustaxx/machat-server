import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MessageOrderByWithRelationInput } from "../../../inputs/MessageOrderByWithRelationInput";
import { MessageWhereInput } from "../../../inputs/MessageWhereInput";
import { MessageWhereUniqueInput } from "../../../inputs/MessageWhereUniqueInput";
import { MessageScalarFieldEnum } from "../../../../enums/MessageScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstMessageArgs {
  @TypeGraphQL.Field(_type => MessageWhereInput, {
    nullable: true
  })
  where?: MessageWhereInput | undefined;

  @TypeGraphQL.Field(_type => [MessageOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: MessageOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => MessageWhereUniqueInput, {
    nullable: true
  })
  cursor?: MessageWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [MessageScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"content" | "authorID" | "conversationID" | "createdAt" | "id"> | undefined;
}
