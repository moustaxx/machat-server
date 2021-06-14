import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ConversationCreateNestedManyWithoutParticipantsInput } from "../inputs/ConversationCreateNestedManyWithoutParticipantsInput";
import { LastReadCreateNestedManyWithoutPersonInput } from "../inputs/LastReadCreateNestedManyWithoutPersonInput";
import { MessageCreateNestedManyWithoutAuthorInput } from "../inputs/MessageCreateNestedManyWithoutAuthorInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class PersonCreateInput {
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

  @TypeGraphQL.Field(_type => ConversationCreateNestedManyWithoutParticipantsInput, {
    nullable: true
  })
  conversations?: ConversationCreateNestedManyWithoutParticipantsInput | undefined;
}
