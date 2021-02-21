import * as TypeGraphQL from "type-graphql";
import { UpsertLastReadArgs } from "./args/UpsertLastReadArgs";
import { LastRead } from "../../../models/LastRead";

@TypeGraphQL.Resolver(_of => LastRead)
export class UpsertLastReadResolver {
  @TypeGraphQL.Mutation(_returns => LastRead, {
    nullable: false
  })
  async upsertLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertLastReadArgs): Promise<LastRead> {
    return ctx.prisma.lastRead.upsert(args);
  }
}
