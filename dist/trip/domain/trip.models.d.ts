export declare enum TripSummaryStatus {
    SEARCHING_FOR_DRIVER = "SEARCHING_FOR_DRIVER",
    DRIVER_ASSIGNED = "DRIVER_ASSIGNED",
    IN_PROGRESS = "IN_PROGRESS",
    PAYMENT_PENDING = "PAYMENT_PENDING",
    ARCHIVED = "ARCHIVED"
}
export declare enum TripInternalStatus {
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    STARTED = "STARTED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export interface TripState {
    id: string;
    version: number;
    status: TripInternalStatus;
    passengerId: string;
    driverId?: string;
    price?: number;
    duration?: number;
}
