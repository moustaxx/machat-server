import * as TypeGraphQL from "type-graphql";
import { DeleteManyLastReadArgs } from "./args/DeleteManyLastReadArgs";
import { LastRead } from "../../../models/LastRead";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LastRead)
export class DeleteManyLastReadResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyLastReadArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).lastRead.deleteMany(args);
  }
}
