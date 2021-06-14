import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadUpdateManyMutationInput } from "../../../inputs/LastReadUpdateManyMutationInput";
import { LastReadWhereInput } from "../../../inputs/LastReadWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyLastReadArgs {
  @TypeGraphQL.Field(_type => LastReadUpdateManyMutationInput, {
    nullable: false
  })
  data!: LastReadUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => LastReadWhereInput, {
    nullable: true
  })
  where?: LastReadWhereInput | undefined;
}
