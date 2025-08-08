export interface IRouteDefinition {
    path: string
    requestMethod: "get" | "post" | "patch" | "delete"
    methodName: string | symbol
}

export interface IParamMetadata {
    index: number
    type: "body" | "params" | "query" | "user"
    key?: string
}