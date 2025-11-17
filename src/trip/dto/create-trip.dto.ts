import { TripSummarySchema } from "prisma/zod";
import { z } from "zod";
import { Prisma, TripStatus } from "@prisma/client";
import { createZodDto } from "nestjs-zod";

const JsonNullTransformer = z.any().transform((val) => {
    return val === null ? Prisma.JsonNull : val;
});

const TripSummaryCreateSchema = TripSummarySchema
    .partial()
    .extend({
        status: TripSummarySchema.shape.status,
        passengerId: TripSummarySchema.shape.passengerId,
        origin: JsonNullTransformer,
        destination: JsonNullTransformer,
    });



export class TripSummaryCreateDto extends createZodDto(TripSummaryCreateSchema) { }
