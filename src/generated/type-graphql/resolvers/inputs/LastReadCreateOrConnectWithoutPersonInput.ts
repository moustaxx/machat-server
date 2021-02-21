import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateWithoutPersonInput } from "../inputs/LastReadCreateWithoutPersonInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LastReadCreateOrConnectWithoutPersonInput {
  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: false
  })
  where!: LastReadWhereUniqueInput;

  @TypeGraphQL.Field(_type => LastReadCreateWithoutPersonInput, {
    nullable: false
  })
  create!: LastReadCreateWithoutPersonInput;
}
