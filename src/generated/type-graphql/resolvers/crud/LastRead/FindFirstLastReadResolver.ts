import * as TypeGraphQL from "type-graphql";
import { FindFirstLastReadArgs } from "./args/FindFirstLastReadArgs";
import { LastRead } from "../../../models/LastRead";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LastRead)
export class FindFirstLastReadResolver {
  @TypeGraphQL.Query(_returns => LastRead, {
    nullable: true
  })
  async findFirstLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstLastReadArgs): Promise<LastRead | null> {
    return getPrismaFromContext(ctx).lastRead.findFirst(args);
  }
}
