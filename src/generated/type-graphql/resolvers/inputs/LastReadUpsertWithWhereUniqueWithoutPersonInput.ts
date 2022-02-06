import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateWithoutPersonInput } from "../inputs/LastReadCreateWithoutPersonInput";
import { LastReadUpdateWithoutPersonInput } from "../inputs/LastReadUpdateWithoutPersonInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType("LastReadUpsertWithWhereUniqueWithoutPersonInput", {
  isAbstract: true
})
export class LastReadUpsertWithWhereUniqueWithoutPersonInput {
  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: false
  })
  where!: LastReadWhereUniqueInput;

  @TypeGraphQL.Field(_type => LastReadUpdateWithoutPersonInput, {
    nullable: false
  })
  update!: LastReadUpdateWithoutPersonInput;

  @TypeGraphQL.Field(_type => LastReadCreateWithoutPersonInput, {
    nullable: false
  })
  create!: LastReadCreateWithoutPersonInput;
}
