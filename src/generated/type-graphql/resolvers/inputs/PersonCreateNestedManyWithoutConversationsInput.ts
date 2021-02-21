import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateOrConnectWithoutConversationsInput } from "../inputs/PersonCreateOrConnectWithoutConversationsInput";
import { PersonCreateWithoutConversationsInput } from "../inputs/PersonCreateWithoutConversationsInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class PersonCreateNestedManyWithoutConversationsInput {
  @TypeGraphQL.Field(_type => [PersonCreateWithoutConversationsInput], {
    nullable: true
  })
  create?: PersonCreateWithoutConversationsInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonCreateOrConnectWithoutConversationsInput], {
    nullable: true
  })
  connectOrCreate?: PersonCreateOrConnectWithoutConversationsInput[] | undefined;

  @TypeGraphQL.Field(_type => [PersonWhereUniqueInput], {
    nullable: true
  })
  connect?: PersonWhereUniqueInput[] | undefined;
}
