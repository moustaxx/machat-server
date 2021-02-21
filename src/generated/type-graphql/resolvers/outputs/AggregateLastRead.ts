import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadAvgAggregate } from "../outputs/LastReadAvgAggregate";
import { LastReadCountAggregate } from "../outputs/LastReadCountAggregate";
import { LastReadMaxAggregate } from "../outputs/LastReadMaxAggregate";
import { LastReadMinAggregate } from "../outputs/LastReadMinAggregate";
import { LastReadSumAggregate } from "../outputs/LastReadSumAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class AggregateLastRead {
  @TypeGraphQL.Field(_type => LastReadCountAggregate, {
    nullable: true
  })
  count!: LastReadCountAggregate | null;

  @TypeGraphQL.Field(_type => LastReadAvgAggregate, {
    nullable: true
  })
  avg!: LastReadAvgAggregate | null;

  @TypeGraphQL.Field(_type => LastReadSumAggregate, {
    nullable: true
  })
  sum!: LastReadSumAggregate | null;

  @TypeGraphQL.Field(_type => LastReadMinAggregate, {
    nullable: true
  })
  min!: LastReadMinAggregate | null;

  @TypeGraphQL.Field(_type => LastReadMaxAggregate, {
    nullable: true
  })
  max!: LastReadMaxAggregate | null;
}
