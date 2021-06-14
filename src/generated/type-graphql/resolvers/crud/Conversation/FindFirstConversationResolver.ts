import * as TypeGraphQL from "type-graphql";
import { FindFirstConversationArgs } from "./args/FindFirstConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Conversation)
export class FindFirstConversationResolver {
  @TypeGraphQL.Query(_returns => Conversation, {
    nullable: true
  })
  async findFirstConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstConversationArgs): Promise<Conversation | null> {
    return getPrismaFromContext(ctx).conversation.findFirst(args);
  }
}
