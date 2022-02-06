import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateWithoutAuthorInput } from "../inputs/MessageCreateWithoutAuthorInput";
import { MessageUpdateWithoutAuthorInput } from "../inputs/MessageUpdateWithoutAuthorInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType("MessageUpsertWithWhereUniqueWithoutAuthorInput", {
  isAbstract: true
})
export class MessageUpsertWithWhereUniqueWithoutAuthorInput {
  @TypeGraphQL.Field(_type => MessageWhereUniqueInput, {
    nullable: false
  })
  where!: MessageWhereUniqueInput;

  @TypeGraphQL.Field(_type => MessageUpdateWithoutAuthorInput, {
    nullable: false
  })
  update!: MessageUpdateWithoutAuthorInput;

  @TypeGraphQL.Field(_type => MessageCreateWithoutAuthorInput, {
    nullable: false
  })
  create!: MessageCreateWithoutAuthorInput;
}
