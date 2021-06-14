import * as TypeGraphQL from "type-graphql";
import { UpdateConversationArgs } from "./args/UpdateConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Conversation)
export class UpdateConversationResolver {
  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: true
  })
  async updateConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateConversationArgs): Promise<Conversation | null> {
    return getPrismaFromContext(ctx).conversation.update(args);
  }
}
