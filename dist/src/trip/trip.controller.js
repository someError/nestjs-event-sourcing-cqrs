"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripController = void 0;
const common_1 = require("@nestjs/common");
const trip_service_1 = require("./trip.service");
const swagger_1 = require("@nestjs/swagger");
const complite_trip_dto_1 = require("./dto/complite-trip.dto");
function Log() {
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = async function (...args) {
            console.log(`Calling ${propertyKey} with`, args);
            const result = await original.apply(this, args);
            console.log(`Result:`, result);
            return result;
        };
    };
}
let TripController = class TripController {
    tripService;
    constructor(tripService) {
        this.tripService = tripService;
    }
    async compliteTrip(tripId, compliteTripDto) {
    }
};
exports.TripController = TripController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Завершить поездку (для водителя)' }),
    (0, common_1.Post)(':id/complite'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, complite_trip_dto_1.CompliteTripDto]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], TripController.prototype, "compliteTrip", null);
exports.TripController = TripController = __decorate([
    (0, swagger_1.ApiTags)('trips'),
    (0, common_1.Controller)('trips'),
    __metadata("design:paramtypes", [trip_service_1.TripService])
], TripController);
//# sourceMappingURL=trip.controller.js.map