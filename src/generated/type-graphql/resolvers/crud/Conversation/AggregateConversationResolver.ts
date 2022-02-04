import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateConversationArgs } from "./args/AggregateConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { AggregateConversation } from "../../outputs/AggregateConversation";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Conversation)
export class AggregateConversationResolver {
  @TypeGraphQL.Query(_returns => AggregateConversation, {
    nullable: false
  })
  async aggregateConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateConversationArgs): Promise<AggregateConversation> {
    return getPrismaFromContext(ctx).conversation.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
