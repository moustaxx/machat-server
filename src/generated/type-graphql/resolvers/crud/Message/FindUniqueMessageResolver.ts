import * as TypeGraphQL from "type-graphql";
import { FindUniqueMessageArgs } from "./args/FindUniqueMessageArgs";
import { Message } from "../../../models/Message";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Message)
export class FindUniqueMessageResolver {
  @TypeGraphQL.Query(_returns => Message, {
    nullable: true
  })
  async message(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueMessageArgs): Promise<Message | null> {
    return getPrismaFromContext(ctx).message.findUnique(args);
  }
}
