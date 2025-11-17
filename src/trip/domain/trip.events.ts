import { createZodDto } from 'nestjs-zod';
import z from 'zod'

export enum TripEventPayloadType {
    TripRequestedEvent = 'TripRequestedEvent',
    TripAcceptedEvent = 'TripAcceptedEvent',
    TripStartedEvent = 'TripStartedEvent',
    TripCompletedEvent = 'TripCompletedEvent',
}

const TripComplitedEventPayloadSchema = z.object({
    type: z.literal(TripEventPayloadType.TripCompletedEvent),
    tripId: z.uuid(),
    driverId: z.uuid(),
    passengerId: z.uuid(),
    finalPrice: z.number(),
    completedAt: z.coerce.date(),
})

export const TripRequestedEventPayloadSchema = z.object({
    type: z.literal(TripEventPayloadType.TripRequestedEvent),
    tripId: z.uuid(),
    passengerId: z.uuid(),
    from: z.object({ lat: z.number(), lon: z.number() }),
    to: z.object({ lat: z.number(), lon: z.number() }),
    requestedAt: z.coerce.date(),
});

export const TripAcceptedEventPayloadSchema = z.object({
    type: z.literal(TripEventPayloadType.TripAcceptedEvent),
    tripId: z.uuid(),
    driverId: z.uuid(),
    acceptedAt: z.coerce.date(),
});

export const TripStartedEventPayloadSchema = z.object({
    type: z.literal(TripEventPayloadType.TripStartedEvent),
    tripId: z.uuid(),
    startedAt: z.coerce.date(),
});

export const TripEventPayloadSchema = z.discriminatedUnion('type', [
    TripAcceptedEventPayloadSchema,
    TripStartedEventPayloadSchema,
    TripRequestedEventPayloadSchema,
    TripComplitedEventPayloadSchema,
])

export type TripStartedEventPayload = Omit<z.infer<typeof TripStartedEventPayloadSchema>, 'type'>
export type TripRequestedEventPayload = Omit<z.infer<typeof TripRequestedEventPayloadSchema>, 'type'>
export type TripComplitedEventPayload = z.infer<typeof TripComplitedEventPayloadSchema>
export type TripAcceptedEventPayload = z.infer<typeof TripAcceptedEventPayloadSchema>

// export class TripRequestedEventPayloadDto extends createZodDto(TripRequestedEventPayloadSchema) {}

export type TripEventPayload = 
    | TripAcceptedEventPayload
    | TripComplitedEventPayload
    | TripRequestedEventPayload
    | TripStartedEventPayload
