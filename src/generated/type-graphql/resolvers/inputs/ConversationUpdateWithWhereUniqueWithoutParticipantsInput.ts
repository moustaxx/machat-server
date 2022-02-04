import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationUpdateWithoutParticipantsInput } from "../inputs/ConversationUpdateWithoutParticipantsInput";
import { ConversationWhereUniqueInput } from "../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.InputType("ConversationUpdateWithWhereUniqueWithoutParticipantsInput", {
  isAbstract: true
})
export class ConversationUpdateWithWhereUniqueWithoutParticipantsInput {
  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: false
  })
  where!: ConversationWhereUniqueInput;

  @TypeGraphQL.Field(_type => ConversationUpdateWithoutParticipantsInput, {
    nullable: false
  })
  data!: ConversationUpdateWithoutParticipantsInput;
}
