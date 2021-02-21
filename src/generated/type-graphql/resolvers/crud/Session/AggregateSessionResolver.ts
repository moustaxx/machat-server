import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateSessionArgs } from "./args/AggregateSessionArgs";
import { Session } from "../../../models/Session";
import { AggregateSession } from "../../outputs/AggregateSession";

@TypeGraphQL.Resolver(_of => Session)
export class AggregateSessionResolver {
  @TypeGraphQL.Query(_returns => AggregateSession, {
    nullable: false
  })
  async aggregateSession(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateSessionArgs): Promise<AggregateSession> {
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

    return ctx.prisma.session.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
