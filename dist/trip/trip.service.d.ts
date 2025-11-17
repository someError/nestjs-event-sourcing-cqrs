import { CompliteTripDto } from './dto/complite-trip.dto';
import { EventBus } from '@nestjs/cqrs';
import { TripEvent } from './domain/trip.events';
import { IEventStoreRepository } from 'src/shared/repositories/event-store/event-store.interface';
export declare class TripService {
    private readonly eventStore;
    private readonly eventBus;
    constructor(eventStore: IEventStoreRepository<TripEvent>, eventBus: EventBus);
    compliteTrip(tripId: string, driverId: string, compliteTripDto: CompliteTripDto): Promise<void>;
    private reconstructState;
}
