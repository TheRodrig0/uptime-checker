import type { IMonitorRepository } from "../types/monitor-interface"
import { Monitor } from "../entities/monitor"

export class InMemoryMonitorRepository implements IMonitorRepository<Monitor> {
    private monitors: Map<string, Monitor> = new Map()

    async findByOne(id: string, userId: string): Promise<Monitor | null> {
        const monitor = this.monitors.get(id)

        if (monitor?.toJSON().userId === userId) {
            return monitor
        }

        return null
    }

    async findAll(userId: string, query: { status?: string, page?: number }): Promise<Monitor[]> {
        let userMonitors = [...this.monitors.values()].filter(
            monitor => monitor.toJSON().userId === userId
        )

        if (query.status) {
            userMonitors = userMonitors.filter(
                monitor => monitor.toJSON().status === query.status
            )
        }

        return userMonitors
    }

    async create(entity: Monitor): Promise<Monitor | null> {
        const { id } = entity.toJSON()

        if (this.monitors.has(id)) {
            return null
        }

        this.monitors.set(id, entity)
        return entity
    }

    async update(entity: Monitor): Promise<Monitor | null> {
        const { id, userId } = entity.toJSON()

        const existingMonitor = this.monitors.get(id)

        if (existingMonitor?.toJSON().userId !== userId) {
            return null
        }

        this.monitors.set(id, entity)
        return entity
    }

    async delete(id: string, userId: string): Promise<boolean> {
        const monitorToDelete = this.monitors.get(id)

        if (monitorToDelete?.toJSON().userId === userId) {
            return this.monitors.delete(id)
        }

        return false
    }
}