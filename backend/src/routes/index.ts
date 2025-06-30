import type { AppInterface } from "../types/app-interface"
import type { AppControllers } from "./types"
import { RegisterV1Routes } from "./v1"

const routePath: string = "api"

export const RegisterRoutes = (app: AppInterface, controllers: AppControllers) => {
    app.register(async () => RegisterV1Routes(app, controllers), { prefix: routePath })
}