import type { CrudRepositoryInterface } from "../../types/crud-repository-interface"
import { ID } from "../../value-objects/id"
import { MonitorEntity } from "../entities/monitor-entity"

export class InMemoryMonitorRepository implements CrudRepositoryInterface<MonitorEntity, ID> {
    private monitors: Record<string, MonitorEntity> = {}

    async findAll(): Promise<MonitorEntity[]> {
        return Object.values(this.monitors)
    }

    async findById(id: ID): Promise<MonitorEntity | null> {
        const idValue = id.getValue()
        
        return this.monitors[idValue] || null
    }

    async create(data: MonitorEntity): Promise<MonitorEntity> {
        const idLength = 10
        const id = crypto.randomUUID().slice(0, idLength)

        const monitor = new MonitorEntity({
            ...data.toJSON(),
            id: id,                 
            status: 'unknown'
        })

        this.monitors[id] = monitor
        return monitor
    }

    async update(id: ID, newDataEntity: MonitorEntity): Promise<MonitorEntity | null> {
        const idValue = id.getValue()
        const existingMonitor = this.monitors[idValue]

        if (!existingMonitor) {
            return null
        }

        const oldProps = existingMonitor.toJSON()
        const newProps = newDataEntity.toJSON()

        const finalProps = { ...oldProps }

        if (newProps.name !== undefined && newProps.name !== null) {
            finalProps.name = newProps.name
        }
        if (newProps.url !== undefined && newProps.url !== null) {
            finalProps.url = newProps.url
        }
        if (newProps.interval !== undefined && newProps.interval !== null) {
            finalProps.interval = newProps.interval
        }
        if (newProps.isActive !== undefined && newProps.isActive !== null) {
            finalProps.isActive = newProps.isActive
        }

        const updatedEntity = new MonitorEntity(finalProps)
        
        this.monitors[idValue] = updatedEntity
        return updatedEntity
    }

    async delete(id: ID): Promise<void> {
        const idValue = id.getValue()

        delete this.monitors[idValue]
    }

}