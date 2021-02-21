import * as TypeGraphQL from "type-graphql";
import { UpsertSessionArgs } from "./args/UpsertSessionArgs";
import { Session } from "../../../models/Session";

@TypeGraphQL.Resolver(_of => Session)
export class UpsertSessionResolver {
  @TypeGraphQL.Mutation(_returns => Session, {
    nullable: false
  })
  async upsertSession(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertSessionArgs): Promise<Session> {
    return ctx.prisma.session.upsert(args);
  }
}
