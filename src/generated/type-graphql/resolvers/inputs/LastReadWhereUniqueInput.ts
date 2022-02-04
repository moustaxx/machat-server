import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadPersonIDConversationIDCompoundUniqueInput } from "../inputs/LastReadPersonIDConversationIDCompoundUniqueInput";

@TypeGraphQL.InputType("LastReadWhereUniqueInput", {
  isAbstract: true
})
export class LastReadWhereUniqueInput {
  @TypeGraphQL.Field(_type => LastReadPersonIDConversationIDCompoundUniqueInput, {
    nullable: true
  })
  personID_conversationID?: LastReadPersonIDConversationIDCompoundUniqueInput | undefined;
}
