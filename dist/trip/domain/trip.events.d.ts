import z from 'zod';
export declare enum TripEventTypeEnum {
    TripRequestedEvent = "TripRequestedEvent",
    TripAcceptedEvent = "TripAcceptedEvent",
    TripStartedEvent = "TripStartedEvent",
    TripCompletedEvent = "TripCompletedEvent"
}
declare const TripComplitedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<TripEventTypeEnum.TripCompletedEvent>;
    tripId: z.ZodUUID;
    driverId: z.ZodUUID;
    passengerId: z.ZodUUID;
    finalPrice: z.ZodNumber;
    completedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export declare const TripRequestedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<TripEventTypeEnum.TripRequestedEvent>;
    tripId: z.ZodUUID;
    passengerId: z.ZodUUID;
    from: z.ZodObject<{
        lat: z.ZodNumber;
        lon: z.ZodNumber;
    }, z.core.$strip>;
    to: z.ZodObject<{
        lat: z.ZodNumber;
        lon: z.ZodNumber;
    }, z.core.$strip>;
    requestedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export declare const TripAcceptedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<TripEventTypeEnum.TripAcceptedEvent>;
    tripId: z.ZodUUID;
    driverId: z.ZodUUID;
    acceptedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export declare const TripStartedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<TripEventTypeEnum.TripStartedEvent>;
    tripId: z.ZodUUID;
    startedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export declare const TripEventSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<TripEventTypeEnum.TripAcceptedEvent>;
    tripId: z.ZodUUID;
    driverId: z.ZodUUID;
    acceptedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<TripEventTypeEnum.TripStartedEvent>;
    tripId: z.ZodUUID;
    startedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<TripEventTypeEnum.TripRequestedEvent>;
    tripId: z.ZodUUID;
    passengerId: z.ZodUUID;
    from: z.ZodObject<{
        lat: z.ZodNumber;
        lon: z.ZodNumber;
    }, z.core.$strip>;
    to: z.ZodObject<{
        lat: z.ZodNumber;
        lon: z.ZodNumber;
    }, z.core.$strip>;
    requestedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<TripEventTypeEnum.TripCompletedEvent>;
    tripId: z.ZodUUID;
    driverId: z.ZodUUID;
    passengerId: z.ZodUUID;
    finalPrice: z.ZodNumber;
    completedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>], "type">;
export type TripStartedEvent = z.infer<typeof TripStartedEventSchema>;
export type TripRequestedEvent = z.infer<typeof TripRequestedEventSchema>;
export type TripComplitedEvent = z.infer<typeof TripComplitedEventSchema>;
export type TripAcceptedEvent = z.infer<typeof TripAcceptedEventSchema>;
export type TripEvent = TripAcceptedEvent | TripComplitedEvent | TripRequestedEvent | TripStartedEvent;
export {};
