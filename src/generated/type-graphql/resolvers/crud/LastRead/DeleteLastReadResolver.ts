import * as TypeGraphQL from "type-graphql";
import { DeleteLastReadArgs } from "./args/DeleteLastReadArgs";
import { LastRead } from "../../../models/LastRead";

@TypeGraphQL.Resolver(_of => LastRead)
export class DeleteLastReadResolver {
  @TypeGraphQL.Mutation(_returns => LastRead, {
    nullable: true
  })
  async deleteLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteLastReadArgs): Promise<LastRead | null> {
    return ctx.prisma.lastRead.delete(args);
  }
}
