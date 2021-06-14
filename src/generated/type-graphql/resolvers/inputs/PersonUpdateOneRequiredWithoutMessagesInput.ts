import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PersonCreateOrConnectWithoutMessagesInput } from "../inputs/PersonCreateOrConnectWithoutMessagesInput";
import { PersonCreateWithoutMessagesInput } from "../inputs/PersonCreateWithoutMessagesInput";
import { PersonUpdateWithoutMessagesInput } from "../inputs/PersonUpdateWithoutMessagesInput";
import { PersonUpsertWithoutMessagesInput } from "../inputs/PersonUpsertWithoutMessagesInput";
import { PersonWhereUniqueInput } from "../inputs/PersonWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class PersonUpdateOneRequiredWithoutMessagesInput {
  @TypeGraphQL.Field(_type => PersonCreateWithoutMessagesInput, {
    nullable: true
  })
  create?: PersonCreateWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => PersonCreateOrConnectWithoutMessagesInput, {
    nullable: true
  })
  connectOrCreate?: PersonCreateOrConnectWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => PersonUpsertWithoutMessagesInput, {
    nullable: true
  })
  upsert?: PersonUpsertWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => PersonWhereUniqueInput, {
    nullable: true
  })
  connect?: PersonWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => PersonUpdateWithoutMessagesInput, {
    nullable: true
  })
  update?: PersonUpdateWithoutMessagesInput | undefined;
}
