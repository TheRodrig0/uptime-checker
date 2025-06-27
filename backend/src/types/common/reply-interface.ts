interface SendInterface {
    code?: number
    message?: string
    data?: unknown
    error?: string
}

export interface ReplyInterface {
    status(statusCode: number): ReplyInterface
    send(payload?: SendInterface): ReplyInterface
    code(code: number): ReplyInterface
}