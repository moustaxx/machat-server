import * as TypeGraphQL from "type-graphql";
import { UpsertPersonArgs } from "./args/UpsertPersonArgs";
import { Person } from "../../../models/Person";

@TypeGraphQL.Resolver(_of => Person)
export class UpsertPersonResolver {
  @TypeGraphQL.Mutation(_returns => Person, {
    nullable: false
  })
  async upsertPerson(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertPersonArgs): Promise<Person> {
    return ctx.prisma.person.upsert(args);
  }
}
