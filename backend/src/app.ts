import type { AppInterface } from "./types/app-interface"
import fastify from "fastify"
import { RegisterRoutes } from "./routes"
import { InMemoryMonitorRepository } from "./modules/monitor/repositories/in-memory-monitor-repository"
import { MonitorService } from "./modules/monitor/services/monitor-service"
import { MonitorController } from "./modules/monitor/controllers/monitor-controller"

const monitorRepository = new InMemoryMonitorRepository()
const monitorService = new MonitorService(monitorRepository)
const monitorController = new MonitorController(monitorService)

const controllers = {
    monitor: monitorController
} as const

const app = fastify({ logger: true }) as unknown as AppInterface

const buildApp = async () => {
    RegisterRoutes(app, controllers)
    await app.ready()
    app.listen({ port: 3000 })
    console.log(app.printRoutes())
}

buildApp()
