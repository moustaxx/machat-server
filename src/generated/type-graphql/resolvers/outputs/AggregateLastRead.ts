import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadAvgAggregate } from "../outputs/LastReadAvgAggregate";
import { LastReadCountAggregate } from "../outputs/LastReadCountAggregate";
import { LastReadMaxAggregate } from "../outputs/LastReadMaxAggregate";
import { LastReadMinAggregate } from "../outputs/LastReadMinAggregate";
import { LastReadSumAggregate } from "../outputs/LastReadSumAggregate";

@TypeGraphQL.ObjectType("AggregateLastRead", {
  isAbstract: true
})
export class AggregateLastRead {
  @TypeGraphQL.Field(_type => LastReadCountAggregate, {
    nullable: true
  })
  _count!: LastReadCountAggregate | null;

  @TypeGraphQL.Field(_type => LastReadAvgAggregate, {
    nullable: true
  })
  _avg!: LastReadAvgAggregate | null;

  @TypeGraphQL.Field(_type => LastReadSumAggregate, {
    nullable: true
  })
  _sum!: LastReadSumAggregate | null;

  @TypeGraphQL.Field(_type => LastReadMinAggregate, {
    nullable: true
  })
  _min!: LastReadMinAggregate | null;

  @TypeGraphQL.Field(_type => LastReadMaxAggregate, {
    nullable: true
  })
  _max!: LastReadMaxAggregate | null;
}
