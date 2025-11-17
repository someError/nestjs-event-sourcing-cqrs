export declare class TripCompletedEvent {
    readonly tripId: string;
    readonly driverId: string;
    readonly passengerId: string;
    readonly finalPrice: number;
    readonly completedAt: Date;
    readonly type: any;
    constructor(tripId: string, driverId: string, passengerId: string, finalPrice: number, completedAt: Date);
}
export declare class TripRequestedEvent {
    readonly tripId: string;
    readonly passengerId: string;
    readonly from: {
        lat: number;
        lon: number;
    };
    readonly to: {
        lat: number;
        lon: number;
    };
    readonly requestedAt: Date;
    readonly type: any;
    constructor(tripId: string, passengerId: string, from: {
        lat: number;
        lon: number;
    }, to: {
        lat: number;
        lon: number;
    }, requestedAt: Date);
}
export declare class TripAcceptedEvent {
    readonly tripId: string;
    readonly driverId: string;
    readonly acceptedAt: Date;
    readonly type: any;
    constructor(tripId: string, driverId: string, acceptedAt: Date);
}
export declare class TripStartedEvent {
    readonly tripId: string;
    readonly startedAt: Date;
    readonly type: any;
    constructor(tripId: string, startedAt: Date);
}
export type TripEvent = TripStartedEvent | TripAcceptedEvent | TripRequestedEvent | TripCompletedEvent;
