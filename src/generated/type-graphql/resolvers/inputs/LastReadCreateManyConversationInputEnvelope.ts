import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { LastReadCreateManyConversationInput } from "../inputs/LastReadCreateManyConversationInput";

@TypeGraphQL.InputType("LastReadCreateManyConversationInputEnvelope", {
  isAbstract: true
})
export class LastReadCreateManyConversationInputEnvelope {
  @TypeGraphQL.Field(_type => [LastReadCreateManyConversationInput], {
    nullable: false
  })
  data!: LastReadCreateManyConversationInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
