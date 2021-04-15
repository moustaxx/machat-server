import * as TypeGraphQL from "type-graphql";
import { CreateLastReadArgs } from "./args/CreateLastReadArgs";
import { LastRead } from "../../../models/LastRead";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LastRead)
export class CreateLastReadResolver {
  @TypeGraphQL.Mutation(_returns => LastRead, {
    nullable: false
  })
  async createLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateLastReadArgs): Promise<LastRead> {
    return getPrismaFromContext(ctx).lastRead.create(args);
  }
}
