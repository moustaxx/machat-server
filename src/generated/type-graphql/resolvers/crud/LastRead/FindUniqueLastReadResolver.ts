import * as TypeGraphQL from "type-graphql";
import { FindUniqueLastReadArgs } from "./args/FindUniqueLastReadArgs";
import { LastRead } from "../../../models/LastRead";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LastRead)
export class FindUniqueLastReadResolver {
  @TypeGraphQL.Query(_returns => LastRead, {
    nullable: true
  })
  async lastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueLastReadArgs): Promise<LastRead | null> {
    return getPrismaFromContext(ctx).lastRead.findUnique(args);
  }
}
