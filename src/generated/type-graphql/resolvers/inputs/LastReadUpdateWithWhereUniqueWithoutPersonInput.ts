import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadUpdateWithoutPersonInput } from "../inputs/LastReadUpdateWithoutPersonInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LastReadUpdateWithWhereUniqueWithoutPersonInput {
  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: false
  })
  where!: LastReadWhereUniqueInput;

  @TypeGraphQL.Field(_type => LastReadUpdateWithoutPersonInput, {
    nullable: false
  })
  data!: LastReadUpdateWithoutPersonInput;
}
