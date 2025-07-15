import type { ICrudRepository, ICrudService } from "../../shared/types/crud-interfaces"
import type { MonitorDTO, CreateMonitorDTO, UpdateMonitorDTO } from "../types/monitor-dtos"
import { Monitor } from "../entities/monitor"
import { TYPES } from "../types/inversify-types"
import { injectable, inject } from "inversify"
import { NotFoundError } from "../../shared/custom-errors/not-found-error"

@injectable()
export class MonitorService implements ICrudService<CreateMonitorDTO, UpdateMonitorDTO, MonitorDTO, { id: string }> {
    constructor(@inject(TYPES.InMemoryMonitorRepository) private readonly repository: ICrudRepository<Monitor, { id: string }>) { }

    async findAll(): Promise<MonitorDTO[]> {
        const monitors = await this.repository.findAll()

        return monitors.map(monitor => monitor.toJSON())
    }

    async findOne(filter: { id: string }): Promise<MonitorDTO | null> {
        const monitor = await this.repository.findOne(filter)

        if (!monitor) {
            throw new NotFoundError(`Monitor with id ${filter.id} not found`)
        }

        return monitor.toJSON()
    }

    async create(data: CreateMonitorDTO): Promise<MonitorDTO> {
        const monitor = new Monitor(data)
        const newMonitor = await this.repository.create(monitor)

        return newMonitor.toJSON()
    }

    async update(filter: { id: string }, data: UpdateMonitorDTO): Promise<MonitorDTO | null> {
        const oldMonitorEntity = await this.repository.findOne(filter)

        if (!oldMonitorEntity) {
            throw new NotFoundError(`Monitor with id ${filter.id} not found for update`)
        }

        const updatedMonitorEntity = new Monitor({
            ...oldMonitorEntity.toJSON(),
            ...data
        })

        const savedMonitor = await this.repository.update(filter, updatedMonitorEntity)

        if (!savedMonitor) {
            throw new NotFoundError(`Failed to update monitor with id ${filter.id}`)
        }

        return savedMonitor.toJSON()
    }

    async delete(filter: { id: string }): Promise<void> {
        const monitor = await this.repository.delete(filter)

        if (!monitor) {
            throw new NotFoundError(`Monitor with id ${filter.id} not found for delete`)
        }
    }

}