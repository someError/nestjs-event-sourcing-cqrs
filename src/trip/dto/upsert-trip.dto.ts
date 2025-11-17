import { TripSummarySchema } from "prisma/zod";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { createZodDto } from "nestjs-zod";

const JsonNullTransformer = z.any().transform((val) => {
    return val === null ? Prisma.JsonNull : val;
});

const TripSummaryUpdateSchema = TripSummarySchema
    .extend({
        origin: JsonNullTransformer.optional(),
        destination: JsonNullTransformer.optional(),
    });



export class TripSummaryUpdateDto extends createZodDto(TripSummaryUpdateSchema) { }
