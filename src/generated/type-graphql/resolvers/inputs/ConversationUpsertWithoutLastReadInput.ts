import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateWithoutLastReadInput } from "../inputs/ConversationCreateWithoutLastReadInput";
import { ConversationUpdateWithoutLastReadInput } from "../inputs/ConversationUpdateWithoutLastReadInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ConversationUpsertWithoutLastReadInput {
  @TypeGraphQL.Field(_type => ConversationUpdateWithoutLastReadInput, {
    nullable: false
  })
  update!: ConversationUpdateWithoutLastReadInput;

  @TypeGraphQL.Field(_type => ConversationCreateWithoutLastReadInput, {
    nullable: false
  })
  create!: ConversationCreateWithoutLastReadInput;
}
