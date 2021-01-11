declare module 'mercurius/lib/subscriber' {
    import { FastifyInstance } from 'fastify';
    import { GraphQLResolveInfo } from 'graphql';
    import { PubSub, MercuriusContext, IFieldResolver } from 'mercurius';

    export class SubscriptionContext<PS = PubSub> {
        constructor(settings: {
            pubsub: PS;
            fastify?: FastifyInstance;
        });

        subscribe<TResult = any>(
            topics: string | string[]
        ): Promise<Readable & AsyncIterator<TResult>>;

        publish<TResult = any>(
            event: { topic: string; payload: TResult },
        ): Promise<void>;

        close(): void;
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

