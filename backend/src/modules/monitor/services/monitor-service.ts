import type { IMonitorService, IMonitorRepository } from "../types/monitor-interface"
import type { CreateMonitorDTO, MonitorDTO, UpdateMonitorDTO } from "../types/monitor-dtos"
import { inject, injectable } from "inversify"
import { MONITOR_TYPES } from "../types/monitor-inversify-types"
import { Monitor } from "../entities/monitor"
import { NotFoundError } from "../../shared/custom-errors/not-found-error"
import { InternalServerError } from "../../shared/custom-errors/internal-server-error"

@injectable()
export class MonitorService implements IMonitorService<CreateMonitorDTO, UpdateMonitorDTO, MonitorDTO> {
    constructor(@inject(MONITOR_TYPES.MonitorRepository) private readonly monitorRepository: IMonitorRepository<Monitor>) { }

    async findByOne(id: string, userId: string): Promise<MonitorDTO> {
        const monitor = await this.monitorRepository.findByOne(id, userId)

        if (!monitor) {
            throw new NotFoundError(`Monitor with id ${id} not found`)
        }

        return monitor.toJSON()
    }

    async findAll(userId: string, query: { status?: string, page?: number }): Promise<MonitorDTO[]> {
        const monitors = await this.monitorRepository.findAll(userId, query)

        return monitors.map(monitor => monitor.toJSON()) || []
    }

    async create(userId: string, createDTO: CreateMonitorDTO): Promise<MonitorDTO> {
        const monitorInstance = new Monitor({
            ...createDTO,
            userId
        })

        const monitor = await this.monitorRepository.create(monitorInstance)

        if (!monitor) {
            throw new InternalServerError("Unfortunately the monitor could not be created")
        }

        return monitor.toJSON()
    }

    async update(id: string, userId: string, updateDTO: UpdateMonitorDTO): Promise<MonitorDTO> {
        const oldMonitor = await this.monitorRepository.findByOne(id, userId)

        if (!oldMonitor) {
            throw new NotFoundError(`Monitor with id ${id} not found for update`)
        }

        const newMonitor = new Monitor({
            ...oldMonitor.toJSON(),
            ...updateDTO
        })

        const monitor = await this.monitorRepository.update(newMonitor)

        if (!monitor) {
            throw new NotFoundError(`Failed to update monitor with id ${id}`)
        }

        return monitor.toJSON()
    }

    async delete(id: string, userId: string): Promise<void> {
        const wasDeleted = await this.monitorRepository.delete(id, userId)

        if (!wasDeleted) {
            throw new NotFoundError(`Monitor with id ${id} not found`)
        }
    }
}