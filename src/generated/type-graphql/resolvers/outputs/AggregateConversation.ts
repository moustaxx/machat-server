import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationAvgAggregate } from "../outputs/ConversationAvgAggregate";
import { ConversationCountAggregate } from "../outputs/ConversationCountAggregate";
import { ConversationMaxAggregate } from "../outputs/ConversationMaxAggregate";
import { ConversationMinAggregate } from "../outputs/ConversationMinAggregate";
import { ConversationSumAggregate } from "../outputs/ConversationSumAggregate";

@TypeGraphQL.ObjectType("AggregateConversation", {
  isAbstract: true
})
export class AggregateConversation {
  @TypeGraphQL.Field(_type => ConversationCountAggregate, {
    nullable: true
  })
  _count!: ConversationCountAggregate | null;

  @TypeGraphQL.Field(_type => ConversationAvgAggregate, {
    nullable: true
  })
  _avg!: ConversationAvgAggregate | null;

  @TypeGraphQL.Field(_type => ConversationSumAggregate, {
    nullable: true
  })
  _sum!: ConversationSumAggregate | null;

  @TypeGraphQL.Field(_type => ConversationMinAggregate, {
    nullable: true
  })
  _min!: ConversationMinAggregate | null;

  @TypeGraphQL.Field(_type => ConversationMaxAggregate, {
    nullable: true
  })
  _max!: ConversationMaxAggregate | null;
}
