import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateConversationArgs } from "./args/AggregateConversationArgs";
import { CreateConversationArgs } from "./args/CreateConversationArgs";
import { DeleteConversationArgs } from "./args/DeleteConversationArgs";
import { DeleteManyConversationArgs } from "./args/DeleteManyConversationArgs";
import { FindFirstConversationArgs } from "./args/FindFirstConversationArgs";
import { FindManyConversationArgs } from "./args/FindManyConversationArgs";
import { FindUniqueConversationArgs } from "./args/FindUniqueConversationArgs";
import { UpdateConversationArgs } from "./args/UpdateConversationArgs";
import { UpdateManyConversationArgs } from "./args/UpdateManyConversationArgs";
import { UpsertConversationArgs } from "./args/UpsertConversationArgs";
import { transformFields, getPrismaFromContext } from "../../../helpers";
import { Conversation } from "../../../models/Conversation";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateConversation } from "../../outputs/AggregateConversation";

@TypeGraphQL.Resolver(_of => Conversation)
export class ConversationCrudResolver {
  @TypeGraphQL.Query(_returns => Conversation, {
    nullable: true
  })
  async conversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueConversationArgs): Promise<Conversation | null> {
    return getPrismaFromContext(ctx).conversation.findUnique(args);
  }

  @TypeGraphQL.Query(_returns => Conversation, {
    nullable: true
  })
  async findFirstConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstConversationArgs): Promise<Conversation | null> {
    return getPrismaFromContext(ctx).conversation.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Conversation], {
    nullable: false
  })
  async conversations(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyConversationArgs): Promise<Conversation[]> {
    return getPrismaFromContext(ctx).conversation.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: false
  })
  async createConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateConversationArgs): Promise<Conversation> {
    return getPrismaFromContext(ctx).conversation.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: true
  })
  async deleteConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteConversationArgs): Promise<Conversation | null> {
    return getPrismaFromContext(ctx).conversation.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: true
  })
  async updateConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateConversationArgs): Promise<Conversation | null> {
    return getPrismaFromContext(ctx).conversation.update(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyConversationArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).conversation.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyConversationArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).conversation.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Conversation, {
    nullable: false
  })
  async upsertConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertConversationArgs): Promise<Conversation> {
    return getPrismaFromContext(ctx).conversation.upsert(args);
  }

  @TypeGraphQL.Query(_returns => AggregateConversation, {
    nullable: false
  })
  async aggregateConversation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateConversationArgs): Promise<AggregateConversation> {
    return getPrismaFromContext(ctx).conversation.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
