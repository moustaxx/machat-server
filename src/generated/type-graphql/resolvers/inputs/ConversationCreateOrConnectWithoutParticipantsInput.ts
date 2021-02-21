import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateWithoutParticipantsInput } from "../inputs/ConversationCreateWithoutParticipantsInput";
import { ConversationWhereUniqueInput } from "../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ConversationCreateOrConnectWithoutParticipantsInput {
  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: false
  })
  where!: ConversationWhereUniqueInput;

  @TypeGraphQL.Field(_type => ConversationCreateWithoutParticipantsInput, {
    nullable: false
  })
  create!: ConversationCreateWithoutParticipantsInput;
}
