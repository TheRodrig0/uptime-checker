import type { AppInterface } from "../types/app-interface"
import type { AppControllers } from "./types"
import { v1Routes } from "./v1"

const routePath: string = "api"

export const routes = (app: AppInterface, controllers: AppControllers) => {
    app.register(async () => v1Routes(app, controllers), { prefix: routePath })
}