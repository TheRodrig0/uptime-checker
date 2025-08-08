import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import type { IReply } from "../types/http-interfaces"
import type { IRouteDefinition } from "../types/decorators-interfaces"

type ControllerInstance = { [key: string | symbol]: (...args: any[]) => Promise<IReply> }

const createRouteHandler = (controller: ControllerInstance, route: IRouteDefinition) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const controllerMethod = controller[route.methodName]
        const boundMethod = controllerMethod.bind(controller)

        const adaptedRequest = {
            body: request.body,
            params: request.params,
            query: request.query,
            user: request.user,
        }

        const result: IReply = await boundMethod(adaptedRequest)

        return reply.status(result.statusCode)
            .send(result?.body)
    }
}

export const fastifyRoutesAdapter = (app: FastifyInstance, controllers: ControllerInstance[]) => {
    for (const controller of controllers) {
        const controllerClass = controller.constructor
        const prefix = Reflect.getMetadata('prefix', controllerClass) || ''
        const routes: IRouteDefinition[] = Reflect.getMetadata('routes', controllerClass) || []

        if (routes.length === 0) {
            continue
        }

        for (const route of routes) {
            const path = (prefix + route.path).replace(/\/+/g, '/')
            const handler = createRouteHandler(controller, route)
            app[route.requestMethod](path, handler)
        }
    }
}