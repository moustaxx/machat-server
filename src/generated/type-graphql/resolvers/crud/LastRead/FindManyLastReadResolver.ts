import * as TypeGraphQL from "type-graphql";
import { FindManyLastReadArgs } from "./args/FindManyLastReadArgs";
import { LastRead } from "../../../models/LastRead";

@TypeGraphQL.Resolver(_of => LastRead)
export class FindManyLastReadResolver {
  @TypeGraphQL.Query(_returns => [LastRead], {
    nullable: false
  })
  async lastReads(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyLastReadArgs): Promise<LastRead[]> {
    return ctx.prisma.lastRead.findMany(args);
  }
}
