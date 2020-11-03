import 'mercurius';

declare module 'mercurius' {
    export interface PubSub {
        subscribe<TResult = any>(
            topics: string | string[],
            queue: Record<string, unknown>
        ): Promise<AsyncIterator<TResult>>;
    }

    export { withFilter } from 'mercurius/lib/subscriber';
}
