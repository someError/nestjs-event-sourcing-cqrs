import { PrismaClient } from '@prisma/client';
import { IEventStoreRepository } from "src/shared/repositories/event-store/event-store.interface";
import { TripEvent } from "src/trip/domain/trip.events";
export declare class PrismaEventStoreRepository implements IEventStoreRepository<TripEvent> {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    getEvents(streamId: string): Promise<TripEvent[]>;
    saveEvents(streamId: string, tripEvents: TripEvent[], expectedVersion: number): Promise<void>;
}
