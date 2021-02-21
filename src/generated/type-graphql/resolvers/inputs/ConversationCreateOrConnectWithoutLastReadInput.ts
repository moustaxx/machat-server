import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateWithoutLastReadInput } from "../inputs/ConversationCreateWithoutLastReadInput";
import { ConversationWhereUniqueInput } from "../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ConversationCreateOrConnectWithoutLastReadInput {
  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: false
  })
  where!: ConversationWhereUniqueInput;

  @TypeGraphQL.Field(_type => ConversationCreateWithoutLastReadInput, {
    nullable: false
  })
  create!: ConversationCreateWithoutLastReadInput;
}
