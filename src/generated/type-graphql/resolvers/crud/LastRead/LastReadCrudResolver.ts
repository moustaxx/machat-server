import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateLastReadArgs } from "./args/AggregateLastReadArgs";
import { CreateLastReadArgs } from "./args/CreateLastReadArgs";
import { DeleteLastReadArgs } from "./args/DeleteLastReadArgs";
import { DeleteManyLastReadArgs } from "./args/DeleteManyLastReadArgs";
import { FindFirstLastReadArgs } from "./args/FindFirstLastReadArgs";
import { FindManyLastReadArgs } from "./args/FindManyLastReadArgs";
import { FindUniqueLastReadArgs } from "./args/FindUniqueLastReadArgs";
import { UpdateLastReadArgs } from "./args/UpdateLastReadArgs";
import { UpdateManyLastReadArgs } from "./args/UpdateManyLastReadArgs";
import { UpsertLastReadArgs } from "./args/UpsertLastReadArgs";
import { LastRead } from "../../../models/LastRead";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateLastRead } from "../../outputs/AggregateLastRead";

@TypeGraphQL.Resolver(_of => LastRead)
export class LastReadCrudResolver {
  @TypeGraphQL.Query(_returns => LastRead, {
    nullable: true
  })
  async lastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueLastReadArgs): Promise<LastRead | null> {
    return ctx.prisma.lastRead.findUnique(args);
  }

  @TypeGraphQL.Query(_returns => LastRead, {
    nullable: true
  })
  async findFirstLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstLastReadArgs): Promise<LastRead | null> {
    return ctx.prisma.lastRead.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [LastRead], {
    nullable: false
  })
  async lastReads(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyLastReadArgs): Promise<LastRead[]> {
    return ctx.prisma.lastRead.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => LastRead, {
    nullable: false
  })
  async createLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateLastReadArgs): Promise<LastRead> {
    return ctx.prisma.lastRead.create(args);
  }

  @TypeGraphQL.Mutation(_returns => LastRead, {
    nullable: true
  })
  async deleteLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteLastReadArgs): Promise<LastRead | null> {
    return ctx.prisma.lastRead.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => LastRead, {
    nullable: true
  })
  async updateLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateLastReadArgs): Promise<LastRead | null> {
    return ctx.prisma.lastRead.update(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyLastReadArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.lastRead.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyLastReadArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.lastRead.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => LastRead, {
    nullable: false
  })
  async upsertLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertLastReadArgs): Promise<LastRead> {
    return ctx.prisma.lastRead.upsert(args);
  }

  @TypeGraphQL.Query(_returns => AggregateLastRead, {
    nullable: false
  })
  async aggregateLastRead(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateLastReadArgs): Promise<AggregateLastRead> {
    function transformFields(fields: Record<string, any>): Record<string, any> {
      return Object.fromEntries(
        Object.entries(fields)
          // remove __typename and others
          .filter(([key, value]) => !key.startsWith("__"))
          .map<[string, any]>(([key, value]) => {
            if (Object.keys(value).length === 0) {
              return [key, true];
            }
            return [key, transformFields(value)];
          }),
      );
    }

    return ctx.prisma.lastRead.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
