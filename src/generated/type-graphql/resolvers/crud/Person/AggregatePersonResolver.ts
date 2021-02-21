import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregatePersonArgs } from "./args/AggregatePersonArgs";
import { Person } from "../../../models/Person";
import { AggregatePerson } from "../../outputs/AggregatePerson";

@TypeGraphQL.Resolver(_of => Person)
export class AggregatePersonResolver {
  @TypeGraphQL.Query(_returns => AggregatePerson, {
    nullable: false
  })
  async aggregatePerson(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregatePersonArgs): Promise<AggregatePerson> {
    function transformFields(fields: Record<string, any>): Record<string, any> {
      return Object.fromEntries(
        Object.entries(fields)
          // remove __typename and others
          .filter(([key, value]) => !key.startsWith("__"))
          .map<[string, any]>(([key, value]) => {
            if (Object.keys(value).length === 0) {
              return [key, true];
            }
            return [key, transformFields(value)];
          }),
      );
    }

    return ctx.prisma.person.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
