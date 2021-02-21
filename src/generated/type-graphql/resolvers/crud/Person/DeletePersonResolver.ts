import * as TypeGraphQL from "type-graphql";
import { DeletePersonArgs } from "./args/DeletePersonArgs";
import { Person } from "../../../models/Person";

@TypeGraphQL.Resolver(_of => Person)
export class DeletePersonResolver {
  @TypeGraphQL.Mutation(_returns => Person, {
    nullable: true
  })
  async deletePerson(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeletePersonArgs): Promise<Person | null> {
    return ctx.prisma.person.delete(args);
  }
}
