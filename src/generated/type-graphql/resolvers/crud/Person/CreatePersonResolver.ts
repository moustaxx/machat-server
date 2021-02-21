import * as TypeGraphQL from "type-graphql";
import { CreatePersonArgs } from "./args/CreatePersonArgs";
import { Person } from "../../../models/Person";

@TypeGraphQL.Resolver(_of => Person)
export class CreatePersonResolver {
  @TypeGraphQL.Mutation(_returns => Person, {
    nullable: false
  })
  async createPerson(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreatePersonArgs): Promise<Person> {
    return ctx.prisma.person.create(args);
  }
}
