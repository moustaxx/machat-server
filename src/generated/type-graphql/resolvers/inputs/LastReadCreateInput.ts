import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateNestedOneWithoutLastReadInput } from "../inputs/ConversationCreateNestedOneWithoutLastReadInput";
import { PersonCreateNestedOneWithoutLastReadInput } from "../inputs/PersonCreateNestedOneWithoutLastReadInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LastReadCreateInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  lastRead!: Date;

  @TypeGraphQL.Field(_type => PersonCreateNestedOneWithoutLastReadInput, {
    nullable: false
  })
  person!: PersonCreateNestedOneWithoutLastReadInput;

  @TypeGraphQL.Field(_type => ConversationCreateNestedOneWithoutLastReadInput, {
    nullable: false
  })
  conversation!: ConversationCreateNestedOneWithoutLastReadInput;
}
