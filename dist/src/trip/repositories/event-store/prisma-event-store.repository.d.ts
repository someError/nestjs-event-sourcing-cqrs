import { PrismaClient } from '@prisma/client';
import { IEventStoreRepository } from "./event-store.interface";
import { TripEvent } from "src/trip/domain/trip.events";
export declare class PrismaEventStoreRepository implements IEventStoreRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    getEvents(streamId: string): Promise<TripEvent[]>;
    saveEvents(streamId: string, events: TripEvent[], expectedVersion: number): Promise<void>;
}
