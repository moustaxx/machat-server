import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationAvgAggregate } from "../outputs/ConversationAvgAggregate";
import { ConversationCountAggregate } from "../outputs/ConversationCountAggregate";
import { ConversationMaxAggregate } from "../outputs/ConversationMaxAggregate";
import { ConversationMinAggregate } from "../outputs/ConversationMinAggregate";
import { ConversationSumAggregate } from "../outputs/ConversationSumAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class AggregateConversation {
  @TypeGraphQL.Field(_type => ConversationCountAggregate, {
    nullable: true
  })
  count!: ConversationCountAggregate | null;

  @TypeGraphQL.Field(_type => ConversationAvgAggregate, {
    nullable: true
  })
  avg!: ConversationAvgAggregate | null;

  @TypeGraphQL.Field(_type => ConversationSumAggregate, {
    nullable: true
  })
  sum!: ConversationSumAggregate | null;

  @TypeGraphQL.Field(_type => ConversationMinAggregate, {
    nullable: true
  })
  min!: ConversationMinAggregate | null;

  @TypeGraphQL.Field(_type => ConversationMaxAggregate, {
    nullable: true
  })
  max!: ConversationMaxAggregate | null;
}
