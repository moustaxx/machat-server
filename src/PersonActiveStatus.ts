import { pubsub } from './PubSub';

type TID = number;
export type TPersonActiveStatusEvent = {
    id: TID;
    active: boolean;
};

export default class PersonActiveStatus {
    private data: Map<TID, true> = new Map();

    private timerMap: Map<TID, NodeJS.Timeout> = new Map();

    private scheduleStatusDispose = (id: TID): void => {
        const currentTimer = this.timerMap.get(id);
        if (currentTimer) clearTimeout(currentTimer);

        const timer = setTimeout(
            () => this.set(id, false),
            30000,
        );
        this.timerMap.set(id, timer);
    };

    public get = (id: TID): boolean => !!this.data.get(id);

    public set = (id: TID, active: boolean): void => {
        if (!active) this.data.delete(id);
        else {
            this.data.set(id, true);
            this.scheduleStatusDispose(id);
        }

        pubsub.publish({
            topic: 'PERSON_ACTIVE_STATUS',
            payload: { id, active } as TPersonActiveStatusEvent,
        });
    };
}

export const personActiveStatus = new PersonActiveStatus();
