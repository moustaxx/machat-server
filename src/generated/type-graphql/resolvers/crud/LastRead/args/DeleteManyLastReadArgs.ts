import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadWhereInput } from "../../../inputs/LastReadWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyLastReadArgs {
  @TypeGraphQL.Field(_type => LastReadWhereInput, {
    nullable: true
  })
  where?: LastReadWhereInput | undefined;
}
