import * as TypeGraphQL from "type-graphql";
import { UpdateManyPersonArgs } from "./args/UpdateManyPersonArgs";
import { Person } from "../../../models/Person";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";

@TypeGraphQL.Resolver(_of => Person)
export class UpdateManyPersonResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyPerson(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyPersonArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.person.updateMany(args);
  }
}
