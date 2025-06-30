import type { AppInterface } from "../../types/app-interface"
import type {
    CreateMonitorRequestType,
    DeleteMonitorRequestType,
    FindMonitorByIdRequestType,
    UpdateMonitorRequestType
} from "../../modules/monitor/types/requests-types"
import { MonitorController } from "../../modules/monitor/controllers/monitor-controller"

const routePath: string = "monitor"

export const monitorRoutes = (app: AppInterface, monitorController: MonitorController) => {
    app.register(async (app: AppInterface) => {
        app.get(`${routePath}s/`, async (request, reply) => {
            return await monitorController
                .findAll(request, reply)
        })

        app.get(`${routePath}/:id`, async (request: FindMonitorByIdRequestType, reply) => {
            return await monitorController
                .findById(request, reply)
        })

        app.post(routePath, async (request: CreateMonitorRequestType, reply) => {
            return await monitorController
                .create(request, reply)
        })

        app.patch(`${routePath}/:id`, async (request: UpdateMonitorRequestType, reply) => {
            return await monitorController
                .update(request, reply)
        })

        app.delete(`${routePath}/:id`, async (request: DeleteMonitorRequestType, reply) => {
            return await monitorController
                .delete(request, reply)
        })
    })
}