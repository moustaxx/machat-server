import * as TypeGraphQL from "type-graphql";
import { UpsertMessageArgs } from "./args/UpsertMessageArgs";
import { Message } from "../../../models/Message";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Message)
export class UpsertMessageResolver {
  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: false
  })
  async upsertMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertMessageArgs): Promise<Message> {
    return getPrismaFromContext(ctx).message.upsert(args);
  }
}
