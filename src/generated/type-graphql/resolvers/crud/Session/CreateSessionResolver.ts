import * as TypeGraphQL from "type-graphql";
import { CreateSessionArgs } from "./args/CreateSessionArgs";
import { Session } from "../../../models/Session";

@TypeGraphQL.Resolver(_of => Session)
export class CreateSessionResolver {
  @TypeGraphQL.Mutation(_returns => Session, {
    nullable: false
  })
  async createSession(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateSessionArgs): Promise<Session> {
    return ctx.prisma.session.create(args);
  }
}
