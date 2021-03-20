/* eslint-disable @typescript-eslint/indent */
import { Arg, Ctx, FieldResolver, ID, Info, Query, Resolver, Root } from 'type-graphql';

import { Node } from './NodeInterface';
import { Connection } from './ConnectionType';
import { Context } from '../context';
import { PersonResolver, ConversationResolver } from '../modules';
import throwErrorWhenUnauthorized from '../helpers/throwErrorWhenUnauthorized';

export type TNodeModel<TModel> = Omit<TModel, 'id' | 'globalId'> & {
    id: `${string}:${string}`;
};

export type TNodeConnection<TModel> = Connection<TNodeModel<TModel>>;

export const toGlobalId = (typename: string, id: string | number) => {
    return `${typename}:${id}`;
};

export const fromGlobalId = (nodeID: string) => {
    const delimiterPos = nodeID.indexOf(':');
    const id = Number(nodeID.substring(delimiterPos + 1));
    const typename = nodeID.substring(0, delimiterPos);

    return { id, typename };
};

@Resolver(() => Node)
export class NodeResolver {
    @FieldResolver()
    globalId(
        @Root() { id }: { id: string | number },
        @Info() { parentType: { name } }: { parentType: { name: string } },
    ): string {
        return toGlobalId(name, id);
    }

    private async fetcher(globalId: string, ctx: Context | Context<true>) {
        throwErrorWhenUnauthorized(ctx.session);
        const { typename, id } = fromGlobalId(globalId);

        switch (typename) {
            case 'ConversationType': {
                return ConversationResolver.prototype.conversation(
                    { whereId: id },
                    ctx as Context<true>,
                );
            }
            case 'PersonType': {
                return PersonResolver.prototype.person({ id }, ctx as Context<true>);
            }
            case 'MessageType': {
                throw new Error('Unallowed type');
            }
            default: {
                throw new Error('Unknown type');
            }
        }
    }

    @Query(() => Node, {
        nullable: true,
        description: 'Fetches an object given its global ID.',
    })
    async node(
        @Arg('id', () => ID, { description: 'The global ID of the object.' })
        globalId: string,
        @Ctx() ctx: Context,
    ): ReturnType<NodeResolver['fetcher']> {
        return this.fetcher(globalId, ctx);
    }

    @Query(() => [Node], {
        nullable: 'items',
        description: 'Fetches objects given their global IDs.',
    })
    nodes(
        @Arg('ids', () => [ID], { description: 'The global IDs of the objects.' })
        globalIds: Array<string>,
        @Ctx() ctx: Context,
    ): Array<ReturnType<NodeResolver['fetcher']>> {
        return globalIds.map(async (id) => this.fetcher(id, ctx));
    }
}
