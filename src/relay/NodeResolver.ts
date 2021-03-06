/* eslint-disable @typescript-eslint/indent */
import { FieldResolver, Info, Resolver, Root } from 'type-graphql';

import { Node } from './NodeInterface';

export type TNodeModel<TModel> = Omit<TModel, 'id' | 'globalId'> & {
    id: `${string}:${string}`;
};

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
}
