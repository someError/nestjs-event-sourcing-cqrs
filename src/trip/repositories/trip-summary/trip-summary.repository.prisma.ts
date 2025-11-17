import { Injectable } from "@nestjs/common";
import { ITripSummaryRepository, TripSummaryInput } from "./trip-summary.interface";
import { Prisma, PrismaClient, TripSummary, TripStatus } from "@prisma/client";
import { TripSummaryCreateDto, TripSummaryUpdateDto } from "src/trip/dto";

@Injectable()
export class TripSummaryRepositoryPrisma implements ITripSummaryRepository {
    constructor(private readonly prisma: PrismaClient){}

    async findOne(tripId: string): Promise<TripSummary | null> {
        const summary = await this.prisma.tripSummary.findUnique({
            where: {tripId: tripId},
        })

        return summary
    }

    async update(data: TripSummaryUpdateDto): Promise<void> {
        const { tripId, ...fields } = data

        await this.prisma.tripSummary.update({
            where: {tripId: tripId},
            data: {
                ...fields,
                updatedAt: new Date(),
            },
        })
    }

    async create(data: TripSummaryCreateDto): Promise<void> {
        await this.prisma.tripSummary.create({
            data
        })
    }
}