import * as TypeGraphQL from "type-graphql";
import { UpdateLastReadArgs } from "./args/UpdateLastReadArgs";
import { LastRead } from "../../../models/LastRead";

@TypeGraphQL.Resolver(_of => LastRead)
export class UpdateLastReadResolver {
  @TypeGraphQL.Mutation(_returns => LastRead, {
    nullable: true
  })
  async updateLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateLastReadArgs): Promise<LastRead | null> {
    return ctx.prisma.lastRead.update(args);
  }
}
