import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateOrConnectWithoutMessagesInput } from "../inputs/PersonCreateOrConnectWithoutMessagesInput";
import { PersonCreateWithoutMessagesInput } from "../inputs/PersonCreateWithoutMessagesInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType("PersonCreateNestedOneWithoutMessagesInput", {
  isAbstract: true
})
export class PersonCreateNestedOneWithoutMessagesInput {
  @TypeGraphQL.Field(_type => PersonCreateWithoutMessagesInput, {
    nullable: true
  })
  create?: PersonCreateWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => PersonCreateOrConnectWithoutMessagesInput, {
    nullable: true
  })
  connectOrCreate?: PersonCreateOrConnectWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: true
  })
  connect?: PersonWhereUniqueInput | undefined;
}
