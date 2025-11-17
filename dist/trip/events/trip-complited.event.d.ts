declare class TripComplitedEvent {
    readonly tripId: string;
    readonly driverId: string;
    readonly passengerId: string;
    readonly finalPrice: number;
    readonly completedAt: Date;
    constructor(tripId: string, driverId: string, passengerId: string, finalPrice: number, completedAt: Date);
}
export default TripComplitedEvent;
