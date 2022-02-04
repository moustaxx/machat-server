import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadCreateManyInput } from "../../../inputs/LastReadCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyLastReadArgs {
  @TypeGraphQL.Field(_type => [LastReadCreateManyInput], {
    nullable: false
  })
  data!: LastReadCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
