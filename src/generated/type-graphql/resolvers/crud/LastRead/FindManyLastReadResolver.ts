import * as TypeGraphQL from "type-graphql";
import { FindManyLastReadArgs } from "./args/FindManyLastReadArgs";
import { LastRead } from "../../../models/LastRead";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LastRead)
export class FindManyLastReadResolver {
  @TypeGraphQL.Query(_returns => [LastRead], {
    nullable: false
  })
  async lastReads(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyLastReadArgs): Promise<LastRead[]> {
    return getPrismaFromContext(ctx).lastRead.findMany(args);
  }
}
