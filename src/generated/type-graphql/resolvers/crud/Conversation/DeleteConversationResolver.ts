import * as TypeGraphQL from "type-graphql";
import { DeleteConversationArgs } from "./args/DeleteConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Conversation)
export class DeleteConversationResolver {
  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: true
  })
  async deleteConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteConversationArgs): Promise<Conversation | null> {
    return getPrismaFromContext(ctx).conversation.delete(args);
  }
}
