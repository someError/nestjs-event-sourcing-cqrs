"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripStartedEvent = exports.TripAcceptedEvent = exports.TripRequestedEvent = exports.TripCompletedEvent = void 0;
class TripCompletedEvent {
    tripId;
    driverId;
    passengerId;
    finalPrice;
    completedAt;
    type = TripCompletedEvent.name;
    constructor(tripId, driverId, passengerId, finalPrice, completedAt) {
        this.tripId = tripId;
        this.driverId = driverId;
        this.passengerId = passengerId;
        this.finalPrice = finalPrice;
        this.completedAt = completedAt;
    }
}
exports.TripCompletedEvent = TripCompletedEvent;
class TripRequestedEvent {
    tripId;
    passengerId;
    from;
    to;
    requestedAt;
    type = TripRequestedEvent.name;
    constructor(tripId, passengerId, from, to, requestedAt) {
        this.tripId = tripId;
        this.passengerId = passengerId;
        this.from = from;
        this.to = to;
        this.requestedAt = requestedAt;
    }
}
exports.TripRequestedEvent = TripRequestedEvent;
class TripAcceptedEvent {
    tripId;
    driverId;
    acceptedAt;
    type = TripAcceptedEvent.name;
    constructor(tripId, driverId, acceptedAt) {
        this.tripId = tripId;
        this.driverId = driverId;
        this.acceptedAt = acceptedAt;
    }
}
exports.TripAcceptedEvent = TripAcceptedEvent;
class TripStartedEvent {
    tripId;
    startedAt;
    type = TripStartedEvent.name;
    constructor(tripId, startedAt) {
        this.tripId = tripId;
        this.startedAt = startedAt;
    }
}
exports.TripStartedEvent = TripStartedEvent;
//# sourceMappingURL=trip.events.js.map