import { z } from "zod";
declare const CompliteTripDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    lat: z.ZodNumber;
    lng: z.ZodNumber;
}, z.core.$strip>> & {
    io: "input";
};
export declare class CompliteTripDto extends CompliteTripDto_base {
}
export {};
