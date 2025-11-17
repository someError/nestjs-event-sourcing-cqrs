export declare const IEventStoreRepository: any;
export interface IEventStoreRepository<T> {
    getEvents(streamId: string): Promise<T[]>;
    saveEvents(streamId: string, events: T[], expectedVersion: number): Promise<void>;
}
