import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateLastReadArgs } from "./args/AggregateLastReadArgs";
import { LastRead } from "../../../models/LastRead";
import { AggregateLastRead } from "../../outputs/AggregateLastRead";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LastRead)
export class AggregateLastReadResolver {
  @TypeGraphQL.Query(_returns => AggregateLastRead, {
    nullable: false
  })
  async aggregateLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateLastReadArgs): Promise<AggregateLastRead> {
    return getPrismaFromContext(ctx).lastRead.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
