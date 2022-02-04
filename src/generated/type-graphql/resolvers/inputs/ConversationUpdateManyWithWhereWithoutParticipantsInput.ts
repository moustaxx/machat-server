import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationScalarWhereInput } from "../inputs/ConversationScalarWhereInput";
import { ConversationUpdateManyMutationInput } from "../inputs/ConversationUpdateManyMutationInput";

@TypeGraphQL.InputType("ConversationUpdateManyWithWhereWithoutParticipantsInput", {
  isAbstract: true
})
export class ConversationUpdateManyWithWhereWithoutParticipantsInput {
  @TypeGraphQL.Field(_type => ConversationScalarWhereInput, {
    nullable: false
  })
  where!: ConversationScalarWhereInput;

  @TypeGraphQL.Field(_type => ConversationUpdateManyMutationInput, {
    nullable: false
  })
  data!: ConversationUpdateManyMutationInput;
}
