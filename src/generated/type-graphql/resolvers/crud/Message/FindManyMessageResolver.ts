import * as TypeGraphQL from "type-graphql";
import { FindManyMessageArgs } from "./args/FindManyMessageArgs";
import { Message } from "../../../models/Message";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Message)
export class FindManyMessageResolver {
  @TypeGraphQL.Query(_returns => [Message], {
    nullable: false
  })
  async messages(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyMessageArgs): Promise<Message[]> {
    return getPrismaFromContext(ctx).message.findMany(args);
  }
}
