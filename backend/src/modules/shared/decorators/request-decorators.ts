import type { IParamMetadata } from "../types/decorators-interfaces"

const createParamsDecorator = (type: IParamMetadata['type']) => {
    return (key?: string): ParameterDecorator => {
        return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
            const params: IParamMetadata[] = Reflect.getMetadata(propertyKey, target) || []

            params.push({
                index: parameterIndex,
                type,
                key
            })

            Reflect.defineMetadata(propertyKey, params, target)
        }
    }
}

export const Body = createParamsDecorator("body")
export const Params = createParamsDecorator("params")
export const Query = createParamsDecorator("query")
export const User = createParamsDecorator("user")