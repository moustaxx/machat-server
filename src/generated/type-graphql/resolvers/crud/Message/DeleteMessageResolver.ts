import * as TypeGraphQL from "type-graphql";
import { DeleteMessageArgs } from "./args/DeleteMessageArgs";
import { Message } from "../../../models/Message";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Message)
export class DeleteMessageResolver {
  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: true
  })
  async deleteMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteMessageArgs): Promise<Message | null> {
    return getPrismaFromContext(ctx).message.delete(args);
  }
}
