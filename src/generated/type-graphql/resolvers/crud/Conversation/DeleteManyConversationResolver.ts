import * as TypeGraphQL from "type-graphql";
import { DeleteManyConversationArgs } from "./args/DeleteManyConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";

@TypeGraphQL.Resolver(_of => Conversation)
export class DeleteManyConversationResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyConversationArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.conversation.deleteMany(args);
  }
}
