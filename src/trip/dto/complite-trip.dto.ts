import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CompliteTripSchema = z.object({
  lat: z.number().min(-90, 'Invalid latitude').max(9, 'Invalid latitude'),
  lng: z.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude'),
});

export class CompliteTripDto extends createZodDto(CompliteTripSchema) { }

