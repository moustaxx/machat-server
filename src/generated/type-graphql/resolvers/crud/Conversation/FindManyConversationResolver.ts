import * as TypeGraphQL from "type-graphql";
import { FindManyConversationArgs } from "./args/FindManyConversationArgs";
import { Conversation } from "../../../models/Conversation";

@TypeGraphQL.Resolver(_of => Conversation)
export class FindManyConversationResolver {
  @TypeGraphQL.Query(_returns => [Conversation], {
    nullable: false
  })
  async conversations(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyConversationArgs): Promise<Conversation[]> {
    return ctx.prisma.conversation.findMany(args);
  }
}
