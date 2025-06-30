import type { CrudRepositoryInterface } from "../../types/crud-repository-interface"
import { ID } from "../../value-objects/id"
import { MonitorEntity } from "../entities/monitor-entity"

export class InMemoryMonitorRepository implements CrudRepositoryInterface<MonitorEntity, ID> {
    private monitors: Record<string, MonitorEntity> = {}

    async findAll(): Promise<MonitorEntity[]> {
        return Object.values(this.monitors)
    }

    async findById(id: ID): Promise<MonitorEntity | null> {
        return this.monitors[id.getValue()] || null
    }

    async create(data: MonitorEntity): Promise<MonitorEntity> {
        const Id = crypto.randomUUID().slice(0, 10)
        data.setID(Id)

        this.monitors[Id] = data
        return data
    }

    async update(id: ID, data: MonitorEntity): Promise<MonitorEntity | null> {
        const idValue = id.getValue()
    
        if (!this.monitors[idValue]) {
            return null
        }

        this.monitors[idValue] = data
        return data
    }

    async delete(id: ID): Promise<void> {
        delete this.monitors[id.getValue()]
    }
}