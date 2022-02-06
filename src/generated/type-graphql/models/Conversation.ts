import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../prisma-client";
import { DecimalJSScalar } from "../scalars";
import { LastRead } from "../models/LastRead";
import { Message } from "../models/Message";
import { Person } from "../models/Person";
import { ConversationCount } from "../resolvers/outputs/ConversationCount";

@TypeGraphQL.ObjectType("Conversation", {
  isAbstract: true
})
export class Conversation {
  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  messages?: Message[];

  lastRead?: LastRead[];

  participants?: Person[];

  @TypeGraphQL.Field(_type => ConversationCount, {
    nullable: true
  })
  _count?: ConversationCount | null;
}
