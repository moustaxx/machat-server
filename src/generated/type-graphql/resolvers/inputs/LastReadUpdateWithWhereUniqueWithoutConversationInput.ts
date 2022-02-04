import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadUpdateWithoutConversationInput } from "../inputs/LastReadUpdateWithoutConversationInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType("LastReadUpdateWithWhereUniqueWithoutConversationInput", {
  isAbstract: true
})
export class LastReadUpdateWithWhereUniqueWithoutConversationInput {
  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: false
  })
  where!: LastReadWhereUniqueInput;

  @TypeGraphQL.Field(_type => LastReadUpdateWithoutConversationInput, {
    nullable: false
  })
  data!: LastReadUpdateWithoutConversationInput;
}
