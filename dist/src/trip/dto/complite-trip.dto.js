"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompliteTripDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const CompliteTripSchema = zod_1.z.object({
    lat: zod_1.z.number().min(-90, 'Invalid latitude').max(9, 'Invalid latitude'),
    lng: zod_1.z.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude'),
});
class CompliteTripDto extends (0, nestjs_zod_1.CreateZodDto)(CompliteTripSchema) {
}
exports.CompliteTripDto = CompliteTripDto;
//# sourceMappingURL=complite-trip.dto.js.map