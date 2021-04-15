import * as TypeGraphQL from "type-graphql";
import { FindUniqueConversationArgs } from "./args/FindUniqueConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Conversation)
export class FindUniqueConversationResolver {
  @TypeGraphQL.Query(_returns => Conversation, {
    nullable: true
  })
  async conversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueConversationArgs): Promise<Conversation | null> {
    return getPrismaFromContext(ctx).conversation.findUnique(args);
  }
}
