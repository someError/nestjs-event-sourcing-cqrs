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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEventStoreRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const trip_events_1 = require("../../domain/trip.events");
let PrismaEventStoreRepository = class PrismaEventStoreRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getEvents(streamId) {
        const events = await this.prisma.eventModel.findMany({
            where: {
                streamId,
            },
            orderBy: {
                version: 'asc',
            },
        });
        try {
            return events.map((tripEvent) => trip_events_1.TripEventSchema.parse(tripEvent.payload));
        }
        catch (error) {
            throw new Error('trip event zod parse error: ' + error);
        }
    }
    async saveEvents(streamId, tripEvents, expectedVersion) {
        try {
            await _saveEvents();
        }
        catch (error) {
            _errorHandler(error);
        }
        async function _saveEvents() {
            await this.prisma.$transaction(async (tx) => {
                const lastEvent = await tx.eventModel.findFirst({
                    where: { streamId },
                    orderBy: { version: 'desc' },
                });
                const currentVersion = lastEvent?.version || 0;
                if (currentVersion !== expectedVersion) {
                    throw new common_1.ConflictException(`Expected version mismatch. Expected: ${expectedVersion}, but got: ${currentVersion}`);
                }
                let version = currentVersion;
                const eventsToCreate = tripEvents.map((tripEvent) => {
                    version++;
                    return {
                        streamId,
                        version: version,
                        payload: tripEvent,
                    };
                });
                await tx.eventModel.createMany({
                    data: eventsToCreate,
                });
            });
        }
        function _errorHandler(error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            if (error?.code == 'P2002') {
                throw new common_1.ConflictException(`Concurrency conflict due to unique constraint on stream ${streamId}.`);
            }
            throw new common_1.InternalServerErrorException(`Failed to save events for stream ${streamId}: ${error.message}`);
        }
    }
};
exports.PrismaEventStoreRepository = PrismaEventStoreRepository;
exports.PrismaEventStoreRepository = PrismaEventStoreRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], PrismaEventStoreRepository);
//# sourceMappingURL=prisma-event-store.repository.js.map