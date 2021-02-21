import * as TypeGraphQL from "type-graphql";
import { UpdateManyConversationArgs } from "./args/UpdateManyConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";

@TypeGraphQL.Resolver(_of => Conversation)
export class UpdateManyConversationResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyConversationArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.conversation.updateMany(args);
  }
}
