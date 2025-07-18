export interface IRouteDefinition {
    path: string
    requestMethod: "get" | "post" | "patch" | "delete"
    methodName: string | symbol
}
