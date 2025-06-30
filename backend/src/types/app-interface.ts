import type { HttpRequestType } from "./common/http-request-type"
import type { ReplyInterface } from "./common/reply-interface"
import type { RequestInterface } from "./common/request-interface"

export interface AppInterface {
    listen(
        opts: { port: number },
        callback?: (error: Error | null, address?: string) => void
    ): void
    register(
        plugin: Function,
        opts?: Record<string, string | number | boolean>
    ): Promise<void>
    ready(): Promise<void>
    printRoutes(): string
    setErrorHandler(
        handler: (error: Error, request: RequestInterface, reply: ReplyInterface) => void
    ): void
    get: HttpRequestType
    post: HttpRequestType
    patch: HttpRequestType
    delete: HttpRequestType
}