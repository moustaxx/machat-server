import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("PersonMaxAggregate", {
  isAbstract: true
})
export class PersonMaxAggregate {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email!: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  id!: number | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isAdmin!: boolean | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  lastSeen!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  username!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  hash!: string | null;
}
