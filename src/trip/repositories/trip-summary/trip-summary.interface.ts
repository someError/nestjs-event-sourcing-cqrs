import { TripSummary } from "@prisma/client";
import { TripSummaryUpdateDto, TripSummaryCreateDto } from "src/trip/dto";

export const ITripSummaryRepository = Symbol('ITripSummaryRepository');

export type TripSummaryInput = Partial<Omit<TripSummary, 'tripId'>> & { tripId: string };

export interface ITripSummaryRepository {
    /**
     * @param tripId - id поездки
     */
    findOne(tripId: string): Promise<TripSummary | null>;

    /**
     * @param data - данные для обновления
     */
    update(data: TripSummaryUpdateDto): Promise<void>;

    /**
     * @param data - данные для создания
     */
    create(data: TripSummaryCreateDto): Promise<void>;

}