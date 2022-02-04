import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateWithoutAuthorInput } from "../inputs/MessageCreateWithoutAuthorInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType("MessageCreateOrConnectWithoutAuthorInput", {
  isAbstract: true
})
export class MessageCreateOrConnectWithoutAuthorInput {
  @TypeGraphQL.Field(_type => MessageWhereUniqueInput, {
    nullable: false
  })
  where!: MessageWhereUniqueInput;

  @TypeGraphQL.Field(_type => MessageCreateWithoutAuthorInput, {
    nullable: false
  })
  create!: MessageCreateWithoutAuthorInput;
}
