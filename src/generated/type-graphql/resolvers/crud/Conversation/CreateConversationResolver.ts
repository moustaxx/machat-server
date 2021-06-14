import * as TypeGraphQL from "type-graphql";
import { CreateConversationArgs } from "./args/CreateConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Conversation)
export class CreateConversationResolver {
  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: false
  })
  async createConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateConversationArgs): Promise<Conversation> {
    return getPrismaFromContext(ctx).conversation.create(args);
  }
}
