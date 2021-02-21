import * as TypeGraphQL from "type-graphql";
import { FindUniqueConversationArgs } from "./args/FindUniqueConversationArgs";
import { Conversation } from "../../../models/Conversation";

@TypeGraphQL.Resolver(_of => Conversation)
export class FindUniqueConversationResolver {
  @TypeGraphQL.Query(_returns => Conversation, {
    nullable: true
  })
  async conversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueConversationArgs): Promise<Conversation | null> {
    return ctx.prisma.conversation.findUnique(args);
  }
}
