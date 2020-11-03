declare module 'mercurius/lib/subscriber' {
    import { FastifyInstance } from 'fastify';
    import { GraphQLResolveInfo } from 'graphql';
    import { PubSub, MercuriusContext, IFieldResolver } from 'mercurius';

    export class SubscriptionContext implements PubSub {
        constructor(settings: {
            pubsub: PubSub,
            fastify?: FastifyInstance,
        });

        subscribe<TResult = any>(topics: string | string[]): Promise<AsyncIterator<TResult>>;
        subscribe<TResult = any>(
            topics: string | string[],
            queue: Record<string, unknown>
        ): Promise<AsyncIterator<TResult>>;

        publish<TResult = any>(
            event: { topic: string; payload: TResult },
            callback?: () => void
        ): void;
    }

    // TODO: Wait for a new release and remove
    export const withFilter: <
        TPayload = any,
        TSource = any,
        TContext = MercuriusContext,
        TArgs = Record<string, any>
    >(
        subscribeFn: IFieldResolver<TSource, TContext, TArgs>,
        filterFn: (
            payload: TPayload,
            args: TArgs,
            context: TContext,
            info: GraphQLResolveInfo & {
                mergeInfo: any
            }
        ) => boolean | Promise<boolean>
    ) => (
        root: TSource,
        args: TArgs,
        context: TContext,
        info: GraphQLResolveInfo & {
            mergeInfo: any
        }
    ) => AsyncGenerator<TPayload>;
}

