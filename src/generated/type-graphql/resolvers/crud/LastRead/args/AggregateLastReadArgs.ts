import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadOrderByInput } from "../../../inputs/LastReadOrderByInput";
import { LastReadWhereInput } from "../../../inputs/LastReadWhereInput";
import { LastReadWhereUniqueInput } from "../../../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateLastReadArgs {
  @TypeGraphQL.Field(_type => LastReadWhereInput, {
    nullable: true
  })
  where?: LastReadWhereInput | undefined;

  @TypeGraphQL.Field(_type => [LastReadOrderByInput], {
    nullable: true
  })
  orderBy?: LastReadOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: true
  })
  cursor?: LastReadWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
