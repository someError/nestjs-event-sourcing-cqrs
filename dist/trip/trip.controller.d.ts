import { TripService } from './trip.service';
import { CompliteTripDto } from './dto/complite-trip.dto';
export declare class TripController {
    private readonly tripService;
    constructor(tripService: TripService);
    compliteTrip(tripId: string, compliteTripDto: CompliteTripDto): Promise<void>;
}
