import * as TypeGraphQL from "type-graphql";
import { UpdateManyLastReadArgs } from "./args/UpdateManyLastReadArgs";
import { LastRead } from "../../../models/LastRead";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LastRead)
export class UpdateManyLastReadResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyLastReadArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).lastRead.updateMany(args);
  }
}
