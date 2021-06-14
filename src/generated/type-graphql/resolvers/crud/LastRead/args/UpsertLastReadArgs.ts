import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadCreateInput } from "../../../inputs/LastReadCreateInput";
import { LastReadUpdateInput } from "../../../inputs/LastReadUpdateInput";
import { LastReadWhereUniqueInput } from "../../../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertLastReadArgs {
  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: false
  })
  where!: LastReadWhereUniqueInput;

  @TypeGraphQL.Field(_type => LastReadCreateInput, {
    nullable: false
  })
  create!: LastReadCreateInput;

  @TypeGraphQL.Field(_type => LastReadUpdateInput, {
    nullable: false
  })
  update!: LastReadUpdateInput;
}
