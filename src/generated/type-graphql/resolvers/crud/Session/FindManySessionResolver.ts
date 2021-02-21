import * as TypeGraphQL from "type-graphql";
import { FindManySessionArgs } from "./args/FindManySessionArgs";
import { Session } from "../../../models/Session";

@TypeGraphQL.Resolver(_of => Session)
export class FindManySessionResolver {
  @TypeGraphQL.Query(_returns => [Session], {
    nullable: false
  })
  async sessions(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManySessionArgs): Promise<Session[]> {
    return ctx.prisma.session.findMany(args);
  }
}
