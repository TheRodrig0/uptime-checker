import type { AppInterface } from "../../types/app-interface"
import type { AppControllers } from "../types"
import { monitorRoutes } from "./monitor-routes"

const routePath: string = "v1/"

export const v1Routes = (app: AppInterface, controllers: AppControllers) => {
    app.register(async () => monitorRoutes(app, controllers.monitor), { prefix: routePath })
}