import { Injectable, Inject, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CompliteTripDto } from './dto/complite-trip.dto';
import {EventBus} from '@nestjs/cqrs'
import { EventEmitter2 } from '@nestjs/event-emitter';
// import { IEventStoreRepository, StoredEvent } from './repositories/event-store/event-store.interface';
import { TripInternalStatus, TripState } from './domain/trip.models';
import { TripAcceptedEvent, TripCompletedEvent, TripEvent, TripEventSchema, TripEventTypeEnum, TripRequestedEventPayload, TripRequestedEventPayloadDto, TripRequestedEventPayloadSchema, TripStartedEvent } from './domain/trip.events';
import { IEventStoreRepository } from 'src/shared/repositories/event-store/event-store.interface';
import { EventModel } from '@prisma/client';
import { ITripSummaryRepository } from './repositories/trip-summary/trip-summary.interface';
import { TripRequestDto } from './dto';
import { uuid } from 'zod';
import { randomUUID } from 'node:crypto';



@Injectable()
export class TripService {
  constructor(
    // EVENT STORE REPOSITORY
    @Inject(IEventStoreRepository)
    private readonly eventStoreRepository: IEventStoreRepository<TripEvent>,
    // READ MODEL REPOSITORY
    @Inject(ITripSummaryRepository)
    private readonly tripSummaryRepository: ITripSummaryRepository,
    // EVENT BUS FOR DOMAIN EVENTS
    private readonly eventEmitter: EventEmitter2
  ) {}

  async requestTrip(tripRequestDto: TripRequestDto): Promise<void> {
    const tripId = randomUUID()

    const tripEvent: TripRequestedEventPayload = {
      passengerId: tripRequestDto.passengerId,
      from: tripRequestDto.from,
      to: tripRequestDto.to,
      tripId: tripId,
      requestedAt: new Date(),
    }

    this.eventEmitter.emit('trip.requested', tripEvent)
  }

  async compliteTrip(tripId: string, driverId: string, compliteTripDto: CompliteTripDto): Promise<void> {
    const events = await this.eventStoreRepository.getEvents(tripId)

    if(!events.length) {
      throw new NotFoundException(`Trip with id: ${tripId} not found`)
    }

    const state = this.reconstructState(events)
  }

  private reconstructState(tripEvents: TripEvent[]): TripState {
    let state = { version: 0 } as TripState;
    
    for (const event of tripEvents) {
      // Используем switch для обработки событий - это более чисто и расширяемо
      switch(event.type) {
        
        case TripEventTypeEnum.TripRequestedEvent:
            state.id = event.payload.tripId;
            state.passengerId = event.payload.passengerId;
            state.status = TripInternalStatus.REQUESTED;
            break;
        case TripEventTypeEnum.TripAcceptedEvent:
            state.driverId = event.payload.driverId;
            state.status = TripInternalStatus.ACCEPTED;
            state.passengerId = event.payload.passengerId
            break;
        case TripEventTypeEnum.TripStartedEvent:
            state.status = TripInternalStatus.STARTED;
            break;
        case TripEventTypeEnum.TripCompletedEvent:
            state.id = event.payload.tripId
      }
      state.version++;
    }
    return state;
  }
  
}
