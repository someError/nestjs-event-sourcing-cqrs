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
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const event_store_interface_1 = require("./repositories/event-store/event-store.interface");
const trip_models_1 = require("./domain/trip.models");
const trip_events_1 = require("./domain/trip.events");
let TripService = class TripService {
    eventStore;
    eventBus;
    constructor(eventStore, eventBus) {
        this.eventStore = eventStore;
        this.eventBus = eventBus;
    }
    async compliteTrip(tripId, driverId, compliteTripDto) {
        const events = await this.eventStore.getEvents(tripId);
        if (!events.length) {
            throw new common_1.NotFoundException(`Trip with id: ${tripId} not found`);
        }
        const state = this.reconstructState(events);
    }
    reconstructState(events) {
        const state = { version: 0 };
        for (const event of events) {
            switch (event.type) {
                case trip_events_1.TripRequestedEvent.name:
                    state.id = event.payload.tripId;
                    state.passengerId = event.payload.passengerId;
                    state.status = trip_models_1.TripInternalStatus.REQUESTED;
                    break;
                case trip_events_1.TripAcceptedEvent.name:
                    state.driverId = event.payload.driverId;
                    state.status = trip_models_1.TripInternalStatus.ACCEPTED;
                    break;
                case trip_events_1.TripStartedEvent.name:
                    state.status = trip_models_1.TripInternalStatus.STARTED;
                    break;
                case trip_events_1.TripCompletedEvent.name:
                    state.id = event.payload.tripId;
            }
            state.version++;
        }
        return state;
    }
};
exports.TripService = TripService;
exports.TripService = TripService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_store_interface_1.IEventStoreRepository)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof cqrs_1.EventBus !== "undefined" && cqrs_1.EventBus) === "function" ? _a : Object])
], TripService);
//# sourceMappingURL=trip.service.js.map