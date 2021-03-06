import * as TypeGraphQL from "type-graphql";
import { DeleteManyMessageArgs } from "./args/DeleteManyMessageArgs";
import { Message } from "../../../models/Message";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Message)
export class DeleteManyMessageResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyMessageArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).message.deleteMany(args);
  }
}
