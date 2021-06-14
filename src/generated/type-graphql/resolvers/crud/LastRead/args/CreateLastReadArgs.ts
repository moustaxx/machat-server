import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadCreateInput } from "../../../inputs/LastReadCreateInput";

@TypeGraphQL.ArgsType()
export class CreateLastReadArgs {
  @TypeGraphQL.Field(_type => LastReadCreateInput, {
    nullable: false
  })
  data!: LastReadCreateInput;
}
