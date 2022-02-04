import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadWhereInput } from "../inputs/LastReadWhereInput";

@TypeGraphQL.InputType("LastReadListRelationFilter", {
  isAbstract: true
})
export class LastReadListRelationFilter {
  @TypeGraphQL.Field(_type => LastReadWhereInput, {
    nullable: true
  })
  every?: LastReadWhereInput | undefined;

  @TypeGraphQL.Field(_type => LastReadWhereInput, {
    nullable: true
  })
  some?: LastReadWhereInput | undefined;

  @TypeGraphQL.Field(_type => LastReadWhereInput, {
    nullable: true
  })
  none?: LastReadWhereInput | undefined;
}
