import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateOrConnectWithoutParticipantsInput } from "../inputs/ConversationCreateOrConnectWithoutParticipantsInput";
import { ConversationCreateWithoutParticipantsInput } from "../inputs/ConversationCreateWithoutParticipantsInput";
import { ConversationWhereUniqueInput } from "../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.InputType("ConversationCreateNestedManyWithoutParticipantsInput", {
  isAbstract: true
})
export class ConversationCreateNestedManyWithoutParticipantsInput {
  @TypeGraphQL.Field(_type => [ConversationCreateWithoutParticipantsInput], {
    nullable: true
  })
  create?: ConversationCreateWithoutParticipantsInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationCreateOrConnectWithoutParticipantsInput], {
    nullable: true
  })
  connectOrCreate?: ConversationCreateOrConnectWithoutParticipantsInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationWhereUniqueInput], {
    nullable: true
  })
  connect?: ConversationWhereUniqueInput[] | undefined;
}
