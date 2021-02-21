import * as TypeGraphQL from "type-graphql";
import { Conversation } from "../../../models/Conversation";
import { LastRead } from "../../../models/LastRead";
import { Message } from "../../../models/Message";
import { Person } from "../../../models/Person";
import { ConversationLastReadArgs } from "./args/ConversationLastReadArgs";
import { ConversationMessagesArgs } from "./args/ConversationMessagesArgs";
import { ConversationParticipantsArgs } from "./args/ConversationParticipantsArgs";

@TypeGraphQL.Resolver(_of => Conversation)
export class ConversationRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Message], {
    nullable: false
  })
  async messages(@TypeGraphQL.Root() conversation: Conversation, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: ConversationMessagesArgs): Promise<Message[]> {
    return ctx.prisma.conversation.findUnique({
      where: {
        id: conversation.id,
      },
    }).messages(args);
  }

  @TypeGraphQL.FieldResolver(_type => [LastRead], {
    nullable: false
  })
  async lastRead(@TypeGraphQL.Root() conversation: Conversation, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: ConversationLastReadArgs): Promise<LastRead[]> {
    return ctx.prisma.conversation.findUnique({
      where: {
        id: conversation.id,
      },
    }).lastRead(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Person], {
    nullable: false
  })
  async participants(@TypeGraphQL.Root() conversation: Conversation, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: ConversationParticipantsArgs): Promise<Person[]> {
    return ctx.prisma.conversation.findUnique({
      where: {
        id: conversation.id,
      },
    }).participants(args);
  }
}
