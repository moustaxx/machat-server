import * as TypeGraphQL from "type-graphql";
import { CreateLastReadArgs } from "./args/CreateLastReadArgs";
import { LastRead } from "../../../models/LastRead";

@TypeGraphQL.Resolver(_of => LastRead)
export class CreateLastReadResolver {
  @TypeGraphQL.Mutation(_returns => LastRead, {
    nullable: false
  })
  async createLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateLastReadArgs): Promise<LastRead> {
    return ctx.prisma.lastRead.create(args);
  }
}
