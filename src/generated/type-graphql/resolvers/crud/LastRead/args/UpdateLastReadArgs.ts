import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadUpdateInput } from "../../../inputs/LastReadUpdateInput";
import { LastReadWhereUniqueInput } from "../../../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateLastReadArgs {
  @TypeGraphQL.Field(_type => LastReadUpdateInput, {
    nullable: false
  })
  data!: LastReadUpdateInput;

  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: false
  })
  where!: LastReadWhereUniqueInput;
}
