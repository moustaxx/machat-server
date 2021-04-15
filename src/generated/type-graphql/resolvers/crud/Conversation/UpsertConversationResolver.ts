import * as TypeGraphQL from "type-graphql";
import { UpsertConversationArgs } from "./args/UpsertConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Conversation)
export class UpsertConversationResolver {
  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: false
  })
  async upsertConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertConversationArgs): Promise<Conversation> {
    return getPrismaFromContext(ctx).conversation.upsert(args);
  }
}
