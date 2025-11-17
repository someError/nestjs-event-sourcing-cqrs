"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TripComplitedEvent {
    tripId;
    driverId;
    passengerId;
    finalPrice;
    completedAt;
    constructor(tripId, driverId, passengerId, finalPrice, completedAt) {
        this.tripId = tripId;
        this.driverId = driverId;
        this.passengerId = passengerId;
        this.finalPrice = finalPrice;
        this.completedAt = completedAt;
    }
}
exports.default = TripComplitedEvent;
//# sourceMappingURL=trip-complited.event.js.map