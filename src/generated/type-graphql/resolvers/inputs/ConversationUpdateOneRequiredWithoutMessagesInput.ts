import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateOrConnectWithoutMessagesInput } from "../inputs/ConversationCreateOrConnectWithoutMessagesInput";
import { ConversationCreateWithoutMessagesInput } from "../inputs/ConversationCreateWithoutMessagesInput";
import { ConversationUpdateWithoutMessagesInput } from "../inputs/ConversationUpdateWithoutMessagesInput";
import { ConversationUpsertWithoutMessagesInput } from "../inputs/ConversationUpsertWithoutMessagesInput";
import { ConversationWhereUniqueInput } from "../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.InputType("ConversationUpdateOneRequiredWithoutMessagesInput", {
  isAbstract: true
})
export class ConversationUpdateOneRequiredWithoutMessagesInput {
  @TypeGraphQL.Field(_type => ConversationCreateWithoutMessagesInput, {
    nullable: true
  })
  create?: ConversationCreateWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => ConversationCreateOrConnectWithoutMessagesInput, {
    nullable: true
  })
  connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => ConversationUpsertWithoutMessagesInput, {
    nullable: true
  })
  upsert?: ConversationUpsertWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: true
  })
  connect?: ConversationWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => ConversationUpdateWithoutMessagesInput, {
    nullable: true
  })
  update?: ConversationUpdateWithoutMessagesInput | undefined;
}
