import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateWithoutConversationInput } from "../inputs/LastReadCreateWithoutConversationInput";
import { LastReadWhereUniqueInput } from "../inputs/LastReadWhereUniqueInput";

@TypeGraphQL.InputType("LastReadCreateOrConnectWithoutConversationInput", {
  isAbstract: true
})
export class LastReadCreateOrConnectWithoutConversationInput {
  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: false
  })
  where!: LastReadWhereUniqueInput;

  @TypeGraphQL.Field(_type => LastReadCreateWithoutConversationInput, {
    nullable: false
  })
  create!: LastReadCreateWithoutConversationInput;
}
