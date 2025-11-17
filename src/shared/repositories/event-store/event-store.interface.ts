export const IEventStoreRepository = Symbol('IEventStoreRepository')


export interface IEventStoreRepository<T> {
    /**
     * Получает все события для указанного streamId (например, для одной поездки)
     * в хронологическом порядке.
     * @param streamId Уникальный идентификатор стрима (например tripId)
    */
    getEvents(streamId: string): Promise<T[]>;

    /**
     * Атомарно сохраняет новые события в стрим.
     * Включает проверку на optimistic concurrency control.
     * @param streamId - Идентификатор потока событий
     * @param events - Массив новых событий для сохранения
     * @param expectedVersion - expectedVersion Версия стрима, на которой мы основывали наши бизнес-решения.
     * Если текущая версия в БД отличается, операция должна провалиться.
     */
    saveEvents(streamId: string, events: T[], expectedVersion: number): Promise<void>;
}