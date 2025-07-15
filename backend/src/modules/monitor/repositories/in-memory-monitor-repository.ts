import type { ICrudRepository } from "../../shared/types/crud-interfaces"
import { Monitor } from "../entities/monitor"

export class InMemoryMonitorRepository implements ICrudRepository<Monitor, { id: string }> {
    private monitors: Map<string, Monitor> = new Map()

    async findAll(): Promise<Monitor[]> {
        return Array.from(this.monitors.values())
    }

    async findOne(filter: { id: string }): Promise<Monitor | null> {
        const monitor = this.monitors.get(filter.id)

        return monitor || null
    }

    async create(entity: Monitor): Promise<Monitor> {
        const { id } = entity.toJSON()
        this.monitors.set(id, entity)

        return entity
    }

    async update(filter: { id: string }, entity: Monitor): Promise<Monitor | null> {
        if (!this.monitors.has(filter.id)) {
            return null
        }

        this.monitors.set(filter.id, entity)

        return entity
    }

    async delete(filter: { id: string }): Promise<boolean> {
        return this.monitors.delete(filter.id)
    }
}