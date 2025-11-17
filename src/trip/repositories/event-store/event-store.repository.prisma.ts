import { Injectable, ConflictException, InternalServerErrorException} from "@nestjs/common";
import { PrismaClient, Prisma } from '@prisma/client';
import { IEventStoreRepository } from "src/shared/repositories/event-store/event-store.interface";
import { TripEventPayload, TripEventPayloadSchema } from "src/trip/domain/trip.events";


@Injectable()
export class PrismaEventStoreRepository implements IEventStoreRepository<TripEventPayload> {
    constructor(private readonly prisma: PrismaClient) { }

    async getEvents(streamId: string): Promise<TripEventPayload[]> {
        const events = await this.prisma.tripEvent.findMany({
            where: {
                streamId,
            },
            orderBy: {
                version: 'asc',
            },
        });

        try {
            return events.map((tripEvent) => TripEventPayloadSchema.parse(tripEvent.payload))
        } catch (error) {
            throw new Error('trip event zod parse error: ' + error)
        }
    }

    async saveEvents(streamId: string, tripEvents: TripEventPayload[], expectedVersion: number): Promise<void> {
        try {
            await _saveEvents();
        } catch (error) {
            _errorHandler(error)
        }

        async function _saveEvents() {
            await this.prisma.$transaction(async (tx) => {
                const lastEvent = await tx.tripEvent.findFirst({
                    where: { streamId },
                    orderBy: { version: 'desc' },
                });

                const currentVersion = lastEvent?.version || 0;

                if (currentVersion !== expectedVersion) {
                    throw new ConflictException(
                        `Expected version mismatch. Expected: ${expectedVersion}, but got: ${currentVersion}`
                    );
                }

                let version = currentVersion;

                const eventsToCreate: Prisma.TripEventCreateInput[]  = tripEvents.map((tripEvent) => {
                    version++;
                    return {
                        streamId,
                        version: version,
                        payload: tripEvent,
                    };
                });

                await tx.tripEvent.createMany({
                    data: eventsToCreate,
                });
            })
        }

        function _errorHandler(error) {
            if (error instanceof ConflictException) {
                throw error;
            }

            if (error?.code == 'P2002') {
                throw new ConflictException(`Concurrency conflict due to unique constraint on stream ${streamId}.`)
            }
            
            throw new InternalServerErrorException(`Failed to save events for stream ${streamId}: ${error.message}`);
        }
    }
}