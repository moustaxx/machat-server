import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateManyConversationInputEnvelope } from "../inputs/LastReadCreateManyConversationInputEnvelope";
import { LastReadCreateOrConnectWithoutConversationInput } from "../inputs/LastReadCreateOrConnectWithoutConversationInput";
import { LastReadCreateWithoutConversationInput } from "../inputs/LastReadCreateWithoutConversationInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType("LastReadCreateNestedManyWithoutConversationInput", {
  isAbstract: true
})
export class LastReadCreateNestedManyWithoutConversationInput {
  @TypeGraphQL.Field(_type => [LastReadCreateWithoutConversationInput], {
    nullable: true
  })
  create?: LastReadCreateWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => [LastReadCreateOrConnectWithoutConversationInput], {
    nullable: true
  })
  connectOrCreate?: LastReadCreateOrConnectWithoutConversationInput[] | undefined;

  @TypeGraphQL.Field(_type => LastReadCreateManyConversationInputEnvelope, {
    nullable: true
  })
  createMany?: LastReadCreateManyConversationInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [LastReadWhereUniqueInput], {
    nullable: true
  })
  connect?: LastReadWhereUniqueInput[] | undefined;
}
