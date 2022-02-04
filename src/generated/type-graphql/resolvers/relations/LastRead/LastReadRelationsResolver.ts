import * as TypeGraphQL from "type-graphql";
import { Conversation } from "../../../models/Conversation";
import { LastRead } from "../../../models/LastRead";
import { Person } from "../../../models/Person";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LastRead)
export class LastReadRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Person, {
    nullable: false
  })
  async person(@TypeGraphQL.Root() lastRead: LastRead, @TypeGraphQL.Ctx() ctx: any): Promise<Person> {
    return getPrismaFromContext(ctx).lastRead.findUnique({
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
    return getPrismaFromContext(ctx).lastRead.findUnique({
      where: {
        personID_conversationID: {
          personID: lastRead.personID,
          conversationID: lastRead.conversationID,
        },
      },
    }).conversation({});
  }
}
