import { PrismaClient } from '@prisma/client';
import { IEventStoreRepository, StoredEvent } from "./event-store.interface";
export declare class PrismaEventStoreRepository implements IEventStoreRepository<any> {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    getEvents<T>(streamId: string): Promise<StoredEvent<T>[]>;
    saveEvents<T>(streamId: string, events: StoredEvent<T>[], expectedVersion: number): Promise<void>;
}
