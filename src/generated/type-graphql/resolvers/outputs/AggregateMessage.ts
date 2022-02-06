import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { MessageAvgAggregate } from "../outputs/MessageAvgAggregate";
import { MessageCountAggregate } from "../outputs/MessageCountAggregate";
import { MessageMaxAggregate } from "../outputs/MessageMaxAggregate";
import { MessageMinAggregate } from "../outputs/MessageMinAggregate";
import { MessageSumAggregate } from "../outputs/MessageSumAggregate";

@TypeGraphQL.ObjectType("AggregateMessage", {
  isAbstract: true
})
export class AggregateMessage {
  @TypeGraphQL.Field(_type => MessageCountAggregate, {
    nullable: true
  })
  _count!: MessageCountAggregate | null;

  @TypeGraphQL.Field(_type => MessageAvgAggregate, {
    nullable: true
  })
  _avg!: MessageAvgAggregate | null;

  @TypeGraphQL.Field(_type => MessageSumAggregate, {
    nullable: true
  })
  _sum!: MessageSumAggregate | null;

  @TypeGraphQL.Field(_type => MessageMinAggregate, {
    nullable: true
  })
  _min!: MessageMinAggregate | null;

  @TypeGraphQL.Field(_type => MessageMaxAggregate, {
    nullable: true
  })
  _max!: MessageMaxAggregate | null;
}
