import * as TypeGraphQL from "type-graphql";
import { Conversation } from "../../../models/Conversation";
import { LastRead } from "../../../models/LastRead";
import { Person } from "../../../models/Person";

@TypeGraphQL.Resolver(_of => LastRead)
export class LastReadRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Person, {
    nullable: false
  })
  async person(@TypeGraphQL.Root() lastRead: LastRead, @TypeGraphQL.Ctx() ctx: any): Promise<Person> {
    return ctx.prisma.lastRead.findUnique({
      where: {
        personID_conversationID: {
          personID: lastRead.personID,
          conversationID: lastRead.conversationID,
        },
      },
    }).person({});
  }

  @TypeGraphQL.FieldResolver(_type => Conversation, {
    nullable: false
  })
  async conversation(@TypeGraphQL.Root() lastRead: LastRead, @TypeGraphQL.Ctx() ctx: any): Promise<Conversation> {
    return ctx.prisma.lastRead.findUnique({
      where: {
        personID_conversationID: {
          personID: lastRead.personID,
          conversationID: lastRead.conversationID,
        },
      },
    }).conversation({});
  }
}
