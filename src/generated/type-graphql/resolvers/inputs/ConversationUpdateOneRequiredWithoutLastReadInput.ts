import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateOrConnectWithoutLastReadInput } from "../inputs/ConversationCreateOrConnectWithoutLastReadInput";
import { ConversationCreateWithoutLastReadInput } from "../inputs/ConversationCreateWithoutLastReadInput";
import { ConversationUpdateWithoutLastReadInput } from "../inputs/ConversationUpdateWithoutLastReadInput";
import { ConversationUpsertWithoutLastReadInput } from "../inputs/ConversationUpsertWithoutLastReadInput";
import { ConversationWhereUniqueInput } from "../inputs/ConversationWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ConversationUpdateOneRequiredWithoutLastReadInput {
  @TypeGraphQL.Field(_type => ConversationCreateWithoutLastReadInput, {
    nullable: true
  })
  create?: ConversationCreateWithoutLastReadInput | undefined;

  @TypeGraphQL.Field(_type => ConversationCreateOrConnectWithoutLastReadInput, {
    nullable: true
  })
  connectOrCreate?: ConversationCreateOrConnectWithoutLastReadInput | undefined;

  @TypeGraphQL.Field(_type => ConversationUpsertWithoutLastReadInput, {
    nullable: true
  })
  upsert?: ConversationUpsertWithoutLastReadInput | undefined;

  @TypeGraphQL.Field(_type => ConversationWhereUniqueInput, {
    nullable: true
  })
  connect?: ConversationWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => ConversationUpdateWithoutLastReadInput, {
    nullable: true
  })
  update?: ConversationUpdateWithoutLastReadInput | undefined;
}
