import { CompliteTripDto } from './dto/complite-trip.dto';
import { EventBus } from '@nestjs/cqrs';
import { IEventStoreRepository } from './repositories/event-store/event-store.interface';
export declare class TripService {
    private readonly eventStore;
    private readonly eventBus;
    constructor(eventStore: IEventStoreRepository, eventBus: EventBus);
    compliteTrip(tripId: string, driverId: string, compliteTripDto: CompliteTripDto): Promise<void>;
    private reconstructState;
}
