import * as TypeGraphQL from "type-graphql";
import { UpdateConversationArgs } from "./args/UpdateConversationArgs";
import { Conversation } from "../../../models/Conversation";

@TypeGraphQL.Resolver(_of => Conversation)
export class UpdateConversationResolver {
  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: true
  })
  async updateConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateConversationArgs): Promise<Conversation | null> {
    return ctx.prisma.conversation.update(args);
  }
}
