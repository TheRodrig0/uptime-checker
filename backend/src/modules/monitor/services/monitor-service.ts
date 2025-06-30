import type { CrudServiceInterface } from "../../types/crud-service-interface"
import type { MonitorRequestDTO, MonitorReplyDTO } from "../types/dtos"
import type { CrudRepositoryInterface } from "../../types/crud-repository-interface"
import { MonitorEntity } from "../entities/monitor-entity"
import { ID } from "../../value-objects/id"
import { NotFoundError } from "../../../utils/error/not-found-error"

export class MonitorService implements CrudServiceInterface<MonitorRequestDTO, MonitorReplyDTO> {
    constructor(private readonly repository: CrudRepositoryInterface<MonitorEntity, ID>) { }

    async findAll(): Promise<MonitorReplyDTO[]> {
        const monitors = await this.repository.findAll()

        return monitors.map(monitor => monitor.toJSON())
    }

    async findById(id: string): Promise<MonitorReplyDTO | null> {
        const monitorId = new ID(id)
        const monitor = await this.repository.findById(monitorId)

        return monitor?.toJSON() ?? null
    }

    async create(data: MonitorRequestDTO): Promise<MonitorReplyDTO> {
        const monitorEntity = new MonitorEntity(data)
        const createdMonitor = await this.repository.create(monitorEntity)
        return createdMonitor.toJSON()
    }

    async update(id: string, data: MonitorRequestDTO): Promise<MonitorReplyDTO | null> {
        const monitorId = new ID(id)

        const monitor = await this.repository.findById(monitorId)

        if (!monitor) {
            throw new NotFoundError(`Monitor doesn't found for update`)
        }

        monitor.update(data)

        const updatedMonitor = await this.repository.update(monitorId, monitor)

        return updatedMonitor?.toJSON() ?? null
    }

    async delete(id: string): Promise<void> {
        const monitorId = new ID(id)
        const monitor = await this.repository.findById(monitorId)

        if (!monitor) {
            throw new Error(`Monitor doesn't found for deletion`)
        }

        await this.repository.delete(monitorId)
    }
}