import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateNestedManyWithoutPersonInput } from "../inputs/LastReadCreateNestedManyWithoutPersonInput";
import { MessageCreateNestedManyWithoutAuthorInput } from "../inputs/MessageCreateNestedManyWithoutAuthorInput";

@TypeGraphQL.InputType("PersonCreateWithoutConversationsInput", {
  isAbstract: true
})
export class PersonCreateWithoutConversationsInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isAdmin?: boolean | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  lastSeen?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  username!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  hash!: string;

  @TypeGraphQL.Field(_type => MessageCreateNestedManyWithoutAuthorInput, {
    nullable: true
  })
  messages?: MessageCreateNestedManyWithoutAuthorInput | undefined;

  @TypeGraphQL.Field(_type => LastReadCreateNestedManyWithoutPersonInput, {
    nullable: true
  })
  lastRead?: LastReadCreateNestedManyWithoutPersonInput | undefined;
}
