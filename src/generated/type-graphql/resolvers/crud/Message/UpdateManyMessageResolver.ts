import * as TypeGraphQL from "type-graphql";
import { UpdateManyMessageArgs } from "./args/UpdateManyMessageArgs";
import { Message } from "../../../models/Message";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Message)
export class UpdateManyMessageResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyMessageArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).message.updateMany(args);
  }
}
