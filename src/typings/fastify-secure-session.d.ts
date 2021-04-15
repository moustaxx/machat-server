import {} from 'fastify-secure-session'; // fixes module type errors

type TSessionFieldMap = {
    clientID: number;
    isClientAdmin: boolean;
};

declare module 'fastify-secure-session' {
    export interface Session {
        // get: true;
        get<K extends keyof TSessionFieldMap>(key: K): TSessionFieldMap[K] | undefined;
        set<K extends keyof TSessionFieldMap>(
            key: K,
            value: TSessionFieldMap[K]
        ): void;
    }

}
