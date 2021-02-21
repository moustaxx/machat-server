import * as TypeGraphQL from "type-graphql";
import { DeleteManyPersonArgs } from "./args/DeleteManyPersonArgs";
import { Person } from "../../../models/Person";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";

@TypeGraphQL.Resolver(_of => Person)
export class DeleteManyPersonResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyPerson(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyPersonArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.person.deleteMany(args);
  }
}
