import * as TypeGraphQL from "type-graphql";
import { FindFirstConversationArgs } from "./args/FindFirstConversationArgs";
import { Conversation } from "../../../models/Conversation";

@TypeGraphQL.Resolver(_of => Conversation)
export class FindFirstConversationResolver {
  @TypeGraphQL.Query(_returns => Conversation, {
    nullable: true
  })
  async findFirstConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstConversationArgs): Promise<Conversation | null> {
    return ctx.prisma.conversation.findFirst(args);
  }
}
