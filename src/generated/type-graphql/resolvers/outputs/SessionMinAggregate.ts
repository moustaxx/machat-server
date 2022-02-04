import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("SessionMinAggregate", {
  isAbstract: true
})
export class SessionMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  sid!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  expire!: Date | null;
}
