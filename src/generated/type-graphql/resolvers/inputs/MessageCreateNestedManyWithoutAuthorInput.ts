import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateOrConnectWithoutAuthorInput } from "../inputs/MessageCreateOrConnectWithoutAuthorInput";
import { MessageCreateWithoutAuthorInput } from "../inputs/MessageCreateWithoutAuthorInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageCreateNestedManyWithoutAuthorInput {
  @TypeGraphQL.Field(_type => [MessageCreateWithoutAuthorInput], {
    nullable: true
  })
  create?: MessageCreateWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageCreateOrConnectWithoutAuthorInput], {
    nullable: true
  })
  connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  connect?: MessageWhereUniqueInput[] | undefined;
}
