import * as TypeGraphQL from "type-graphql";
import { UpdateManyConversationArgs } from "./args/UpdateManyConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Conversation)
export class UpdateManyConversationResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyConversationArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).conversation.updateMany(args);
  }
}
