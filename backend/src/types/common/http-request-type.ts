import { RequestInterface } from "./request-interface"
import { ReplyInterface } from "./reply-interface"

export type HttpRequestType = <T = unknown, U = unknown>(
    path: string,
    handler: (request: RequestInterface<T, U>, reply: ReplyInterface) => unknown
) => void