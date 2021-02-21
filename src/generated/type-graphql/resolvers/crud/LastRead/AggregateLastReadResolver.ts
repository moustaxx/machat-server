import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateLastReadArgs } from "./args/AggregateLastReadArgs";
import { LastRead } from "../../../models/LastRead";
import { AggregateLastRead } from "../../outputs/AggregateLastRead";

@TypeGraphQL.Resolver(_of => LastRead)
export class AggregateLastReadResolver {
  @TypeGraphQL.Query(_returns => AggregateLastRead, {
    nullable: false
  })
  async aggregateLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateLastReadArgs): Promise<AggregateLastRead> {
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

    return ctx.prisma.lastRead.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
