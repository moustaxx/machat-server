import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateWithoutConversationInput } from "../inputs/LastReadCreateWithoutConversationInput";
import { LastReadUpdateWithoutConversationInput } from "../inputs/LastReadUpdateWithoutConversationInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType("LastReadUpsertWithWhereUniqueWithoutConversationInput", {
  isAbstract: true
})
export class LastReadUpsertWithWhereUniqueWithoutConversationInput {
  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: false
  })
  where!: LastReadWhereUniqueInput;

  @TypeGraphQL.Field(_type => LastReadUpdateWithoutConversationInput, {
    nullable: false
  })
  update!: LastReadUpdateWithoutConversationInput;

  @TypeGraphQL.Field(_type => LastReadCreateWithoutConversationInput, {
    nullable: false
  })
  create!: LastReadCreateWithoutConversationInput;
}
