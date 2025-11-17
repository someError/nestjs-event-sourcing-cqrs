export declare const IEventStoreRepository: unique symbol;
export interface IEventStoreRepository<T> {
    getEvents(streamId: string): Promise<T[]>;
    saveEvents(streamId: string, events: T[], expectedVersion: number): Promise<void>;
}
