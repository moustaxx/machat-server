import * as TypeGraphQL from "type-graphql";
import { DeleteConversationArgs } from "./args/DeleteConversationArgs";
import { Conversation } from "../../../models/Conversation";

@TypeGraphQL.Resolver(_of => Conversation)
export class DeleteConversationResolver {
  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: true
  })
  async deleteConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteConversationArgs): Promise<Conversation | null> {
    return ctx.prisma.conversation.delete(args);
  }
}
