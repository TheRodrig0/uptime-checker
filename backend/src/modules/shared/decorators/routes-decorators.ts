import 'reflect-metadata'
import type { IRouteDefinition } from "../types/route-definition-interface"

export const Controller = (prefix: string = ""): ClassDecorator => {
    return (target: object) => {
        Reflect.defineMetadata("prefix", prefix, target)
        
        if (Reflect.hasMetadata("routes", target)) {
            return
        }

        Reflect.defineMetadata("routes", [], target)
    }
}

const createMethodDecorator = (method: IRouteDefinition["requestMethod"]): ((path?: string) => MethodDecorator) => {
    return (path: string = "/"): MethodDecorator => {
        return (target: object, propertyKey: string | symbol) => {
            const controllerClass = target.constructor
            const routes: IRouteDefinition[] = Reflect.getMetadata("routes", controllerClass) || []

            routes.push({
                requestMethod: method,
                path: path,
                methodName: propertyKey
            })

            Reflect.defineMetadata("routes", routes, controllerClass)
        }
    }
}

export const Get = createMethodDecorator("get")
export const Post = createMethodDecorator("post")
export const Patch = createMethodDecorator("patch")
export const Delete = createMethodDecorator("delete")