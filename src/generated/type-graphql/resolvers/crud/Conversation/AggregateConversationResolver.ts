import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateConversationArgs } from "./args/AggregateConversationArgs";
import { Conversation } from "../../../models/Conversation";
import { AggregateConversation } from "../../outputs/AggregateConversation";

@TypeGraphQL.Resolver(_of => Conversation)
export class AggregateConversationResolver {
  @TypeGraphQL.Query(_returns => AggregateConversation, {
    nullable: false
  })
  async aggregateConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateConversationArgs): Promise<AggregateConversation> {
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

    return ctx.prisma.conversation.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
