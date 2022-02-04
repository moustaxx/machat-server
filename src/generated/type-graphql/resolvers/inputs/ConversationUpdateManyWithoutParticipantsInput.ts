import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateOrConnectWithoutParticipantsInput } from "../inputs/ConversationCreateOrConnectWithoutParticipantsInput";
import { ConversationCreateWithoutParticipantsInput } from "../inputs/ConversationCreateWithoutParticipantsInput";
import { ConversationScalarWhereInput } from "../inputs/ConversationScalarWhereInput";
import { ConversationUpdateManyWithWhereWithoutParticipantsInput } from "../inputs/ConversationUpdateManyWithWhereWithoutParticipantsInput";
import { ConversationUpdateWithWhereUniqueWithoutParticipantsInput } from "../inputs/ConversationUpdateWithWhereUniqueWithoutParticipantsInput";
import { ConversationUpsertWithWhereUniqueWithoutParticipantsInput } from "../inputs/ConversationUpsertWithWhereUniqueWithoutParticipantsInput";
import { ConversationWhereUniqueInput } from "../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.InputType("ConversationUpdateManyWithoutParticipantsInput", {
  isAbstract: true
})
export class ConversationUpdateManyWithoutParticipantsInput {
  @TypeGraphQL.Field(_type => [ConversationCreateWithoutParticipantsInput], {
    nullable: true
  })
  create?: ConversationCreateWithoutParticipantsInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationCreateOrConnectWithoutParticipantsInput], {
    nullable: true
  })
  connectOrCreate?: ConversationCreateOrConnectWithoutParticipantsInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationUpsertWithWhereUniqueWithoutParticipantsInput], {
    nullable: true
  })
  upsert?: ConversationUpsertWithWhereUniqueWithoutParticipantsInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationWhereUniqueInput], {
    nullable: true
  })
  set?: ConversationWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationWhereUniqueInput], {
    nullable: true
  })
  disconnect?: ConversationWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationWhereUniqueInput], {
    nullable: true
  })
  delete?: ConversationWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationWhereUniqueInput], {
    nullable: true
  })
  connect?: ConversationWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationUpdateWithWhereUniqueWithoutParticipantsInput], {
    nullable: true
  })
  update?: ConversationUpdateWithWhereUniqueWithoutParticipantsInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationUpdateManyWithWhereWithoutParticipantsInput], {
    nullable: true
  })
  updateMany?: ConversationUpdateManyWithWhereWithoutParticipantsInput[] | undefined;

  @TypeGraphQL.Field(_type => [ConversationScalarWhereInput], {
    nullable: true
  })
  deleteMany?: ConversationScalarWhereInput[] | undefined;
}
