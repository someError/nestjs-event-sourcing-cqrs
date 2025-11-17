export declare const IEventStoreRepository: unique symbol;
export interface StoredEvent<T> {
    type: string;
    payload: T;
}
export interface IEventStoreRepository<T> {
    getEvents(streamId: string): Promise<StoredEvent<T>[]>;
    saveEvents(streamId: string, events: StoredEvent<T>[], expectedVersion: number): Promise<void>;
}
