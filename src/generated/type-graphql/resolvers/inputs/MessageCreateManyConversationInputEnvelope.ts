import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateManyConversationInput } from "../inputs/MessageCreateManyConversationInput";

@TypeGraphQL.InputType("MessageCreateManyConversationInputEnvelope", {
  isAbstract: true
})
export class MessageCreateManyConversationInputEnvelope {
  @TypeGraphQL.Field(_type => [MessageCreateManyConversationInput], {
    nullable: false
  })
  data!: MessageCreateManyConversationInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
