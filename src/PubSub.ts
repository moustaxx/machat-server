import { EventEmitter } from 'events';
import { Readable } from 'stream';

export default class PubSub {
    private emitter = new EventEmitter();

    /** Do not use directly - try to use a `SubscriptionContext` method instead */
    // eslint-disable-next-line @typescript-eslint/require-await
    public async subscribe(topic: string, queue: Readable) {
        const listener = (payload: unknown) => queue.push(payload);

        const close = () => {
            this.emitter.removeListener(topic, listener);
        };

        this.emitter.on(topic, listener);
        // @ts-expect-error mercurius uses this to dispose an event listner
        queue.close = close;
    }

    public publish(event: { topic: string; payload: any }, callback?: () => void) {
        this.emitter.emit(event.topic, event.payload);
        callback?.();
    }
}

export const pubsub = new PubSub();
