import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ConversationCreateManyInput } from "../../../inputs/ConversationCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyConversationArgs {
  @TypeGraphQL.Field(_type => [ConversationCreateManyInput], {
    nullable: false
  })
  data!: ConversationCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
