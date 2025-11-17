"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripEventSchema = exports.TripStartedEventSchema = exports.TripAcceptedEventSchema = exports.TripRequestedEventSchema = exports.TripEventTypeEnum = void 0;
const zod_1 = __importDefault(require("zod"));
var TripEventTypeEnum;
(function (TripEventTypeEnum) {
    TripEventTypeEnum["TripRequestedEvent"] = "TripRequestedEvent";
    TripEventTypeEnum["TripAcceptedEvent"] = "TripAcceptedEvent";
    TripEventTypeEnum["TripStartedEvent"] = "TripStartedEvent";
    TripEventTypeEnum["TripCompletedEvent"] = "TripCompletedEvent";
})(TripEventTypeEnum || (exports.TripEventTypeEnum = TripEventTypeEnum = {}));
const TripComplitedEventSchema = zod_1.default.object({
    type: zod_1.default.literal(TripEventTypeEnum.TripCompletedEvent),
    tripId: zod_1.default.uuid(),
    driverId: zod_1.default.uuid(),
    passengerId: zod_1.default.uuid(),
    finalPrice: zod_1.default.number(),
    completedAt: zod_1.default.coerce.date(),
});
exports.TripRequestedEventSchema = zod_1.default.object({
    type: zod_1.default.literal(TripEventTypeEnum.TripRequestedEvent),
    tripId: zod_1.default.uuid(),
    passengerId: zod_1.default.uuid(),
    from: zod_1.default.object({ lat: zod_1.default.number(), lon: zod_1.default.number() }),
    to: zod_1.default.object({ lat: zod_1.default.number(), lon: zod_1.default.number() }),
    requestedAt: zod_1.default.coerce.date(),
});
exports.TripAcceptedEventSchema = zod_1.default.object({
    type: zod_1.default.literal(TripEventTypeEnum.TripAcceptedEvent),
    tripId: zod_1.default.uuid(),
    driverId: zod_1.default.uuid(),
    acceptedAt: zod_1.default.coerce.date(),
});
exports.TripStartedEventSchema = zod_1.default.object({
    type: zod_1.default.literal(TripEventTypeEnum.TripStartedEvent),
    tripId: zod_1.default.uuid(),
    startedAt: zod_1.default.coerce.date(),
});
exports.TripEventSchema = zod_1.default.discriminatedUnion('type', [
    exports.TripAcceptedEventSchema,
    exports.TripStartedEventSchema,
    exports.TripRequestedEventSchema,
    TripComplitedEventSchema,
]);
//# sourceMappingURL=trip.events.js.map