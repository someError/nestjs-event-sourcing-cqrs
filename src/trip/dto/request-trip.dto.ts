import { z } from "zod";
import { createZodDto } from "nestjs-zod";

const PointSchema = z.object({
    lat: z.number(),
    lon: z.number(),
});

const TripRequestSchema = z.object({
    passengerId: z.uuid({ message: 'Passenger ID is required' }),
    from: PointSchema,
    to: PointSchema,
    requestAt: z.coerce.date
})

export class TripRequestDto extends createZodDto(TripRequestSchema) {
    static name = 'trip.request'
 }