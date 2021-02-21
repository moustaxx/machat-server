import * as TypeGraphQL from "type-graphql";
import { FindFirstLastReadArgs } from "./args/FindFirstLastReadArgs";
import { LastRead } from "../../../models/LastRead";

@TypeGraphQL.Resolver(_of => LastRead)
export class FindFirstLastReadResolver {
  @TypeGraphQL.Query(_returns => LastRead, {
    nullable: true
  })
  async findFirstLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstLastReadArgs): Promise<LastRead | null> {
    return ctx.prisma.lastRead.findFirst(args);
  }
}
