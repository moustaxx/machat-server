import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateNestedOneWithoutLastReadInput } from "../inputs/ConversationCreateNestedOneWithoutLastReadInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LastReadCreateWithoutPersonInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  lastRead!: Date;

  @TypeGraphQL.Field(_type => ConversationCreateNestedOneWithoutLastReadInput, {
    nullable: false
  })
  conversation!: ConversationCreateNestedOneWithoutLastReadInput;
}
