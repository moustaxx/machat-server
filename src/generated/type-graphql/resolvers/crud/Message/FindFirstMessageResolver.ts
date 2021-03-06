import * as TypeGraphQL from "type-graphql";
import { FindFirstMessageArgs } from "./args/FindFirstMessageArgs";
import { Message } from "../../../models/Message";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Message)
export class FindFirstMessageResolver {
  @TypeGraphQL.Query(_returns => Message, {
    nullable: true
  })
  async findFirstMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstMessageArgs): Promise<Message | null> {
    return getPrismaFromContext(ctx).message.findFirst(args);
  }
}
