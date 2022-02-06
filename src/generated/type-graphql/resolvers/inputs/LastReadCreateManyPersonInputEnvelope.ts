import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateManyPersonInput } from "../inputs/LastReadCreateManyPersonInput";

@TypeGraphQL.InputType("LastReadCreateManyPersonInputEnvelope", {
  isAbstract: true
})
export class LastReadCreateManyPersonInputEnvelope {
  @TypeGraphQL.Field(_type => [LastReadCreateManyPersonInput], {
    nullable: false
  })
  data!: LastReadCreateManyPersonInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
