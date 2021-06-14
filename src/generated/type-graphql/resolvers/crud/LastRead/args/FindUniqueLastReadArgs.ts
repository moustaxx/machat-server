import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadWhereUniqueInput } from "../../../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueLastReadArgs {
  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: false
  })
  where!: LastReadWhereUniqueInput;
}
