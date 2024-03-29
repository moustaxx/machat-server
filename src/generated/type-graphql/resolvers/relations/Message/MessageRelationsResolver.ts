import * as TypeGraphQL from "type-graphql";
import { Conversation } from "../../../models/Conversation";
import { Message } from "../../../models/Message";
import { Person } from "../../../models/Person";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Message)
export class MessageRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Person, {
    nullable: false
  })
  async author(@TypeGraphQL.Root() message: Message, @TypeGraphQL.Ctx() ctx: any): Promise<Person> {
    return getPrismaFromContext(ctx).message.findUnique({
      where: {
        id: message.id,
      },
    }).author({});
  }

  @TypeGraphQL.FieldResolver(_type => Conversation, {
    nullable: false
  })
  async conversation(@TypeGraphQL.Root() message: Message, @TypeGraphQL.Ctx() ctx: any): Promise<Conversation> {
    return getPrismaFromContext(ctx).message.findUnique({
      where: {
        id: message.id,
      },
    }).conversation({});
  }
}
