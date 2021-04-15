import * as TypeGraphQL from "type-graphql";
import { Conversation } from "../../../models/Conversation";
import { LastRead } from "../../../models/LastRead";
import { Message } from "../../../models/Message";
import { Person } from "../../../models/Person";
import { PersonConversationsArgs } from "./args/PersonConversationsArgs";
import { PersonLastReadArgs } from "./args/PersonLastReadArgs";
import { PersonMessagesArgs } from "./args/PersonMessagesArgs";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Person)
export class PersonRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Message], {
    nullable: false
  })
  async messages(@TypeGraphQL.Root() person: Person, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: PersonMessagesArgs): Promise<Message[]> {
    return getPrismaFromContext(ctx).person.findUnique({
      where: {
        id: person.id,
      },
    }).messages(args);
  }

  @TypeGraphQL.FieldResolver(_type => [LastRead], {
    nullable: false
  })
  async lastRead(@TypeGraphQL.Root() person: Person, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: PersonLastReadArgs): Promise<LastRead[]> {
    return getPrismaFromContext(ctx).person.findUnique({
      where: {
        id: person.id,
      },
    }).lastRead(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Conversation], {
    nullable: false
  })
  async conversations(@TypeGraphQL.Root() person: Person, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: PersonConversationsArgs): Promise<Conversation[]> {
    return getPrismaFromContext(ctx).person.findUnique({
      where: {
        id: person.id,
      },
    }).conversations(args);
  }
}
