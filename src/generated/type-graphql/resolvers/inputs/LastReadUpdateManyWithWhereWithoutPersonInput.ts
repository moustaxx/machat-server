import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadScalarWhereInput } from "../inputs/LastReadScalarWhereInput";
import { LastReadUpdateManyMutationInput } from "../inputs/LastReadUpdateManyMutationInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LastReadUpdateManyWithWhereWithoutPersonInput {
  @TypeGraphQL.Field(_type => LastReadScalarWhereInput, {
    nullable: false
  })
  where!: LastReadScalarWhereInput;

  @TypeGraphQL.Field(_type => LastReadUpdateManyMutationInput, {
    nullable: false
  })
  data!: LastReadUpdateManyMutationInput;
}
