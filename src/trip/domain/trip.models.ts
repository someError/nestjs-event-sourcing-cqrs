// Этот enum определяет все возможные статусы для НАШЕЙ ПРОЕКЦИИ (Read Model)
// UI VIEW
export enum TripSummaryStatus {
    SEARCHING_FOR_DRIVER = 'SEARCHING_FOR_DRIVER',
    DRIVER_ASSIGNED = 'DRIVER_ASSIGNED',
    IN_PROGRESS = 'IN_PROGRESS',
    PAYMENT_PENDING = 'PAYMENT_PENDING',
    ARCHIVED = 'ARCHIVED',
}

// Этот enum определяет внутренние статусы для нашей реконструированной модели
// Они могут отличаться, если наша бизнес-логика сложнее, чем проекция
// BUISNES LOGIC
export enum TripInternalStatus {
    REQUESTED = 'REQUESTED',
    ACCEPTED = 'ACCEPTED',
    STARTED = 'STARTED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

// Ментальная модель поездки, с которой работает сервис для принятия решений
export interface TripState {
    id: string;
    version: number;
    status: TripInternalStatus;
    passengerId: string;
    driverId?: string;
    price?: number;
    duration?: number;
  }