import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../../../prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MessageCreateManyAuthorInput } from "../inputs/MessageCreateManyAuthorInput";

@TypeGraphQL.InputType("MessageCreateManyAuthorInputEnvelope", {
  isAbstract: true
})
export class MessageCreateManyAuthorInputEnvelope {
  @TypeGraphQL.Field(_type => [MessageCreateManyAuthorInput], {
    nullable: false
  })
  data!: MessageCreateManyAuthorInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
