import { Inject, Injectable } from "@nestjs/common";
import { ITripSummaryRepository } from "../repositories/trip-summary/trip-summary.interface";
import { OnEvent } from "@nestjs/event-emitter";
import { TripRequestDto } from "../dto";
import { TripStatus } from "@prisma/client";
import { type TripRequestedEventPayload } from "../domain/trip.events";

@Injectable()
export class TripSummaryProjector {
    constructor(
        @Inject(ITripSummaryRepository)
        private readonly tripSummaryRepository: ITripSummaryRepository
    ) {}

    @OnEvent('trip.requested')
    async handleTripRequested(payload: TripRequestedEventPayload) {
        this.tripSummaryRepository.create({
            status: 'SEARCHING_FOR_DRIVER',
            origin: payload.from,
            destination: payload.to,
            passengerId: payload.passengerId,
        })
    }
}