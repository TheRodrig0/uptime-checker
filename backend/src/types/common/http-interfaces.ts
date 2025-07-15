export interface IRequest<
    Body = unknown,
    Params = unknown,
    Query = unknown,
    Headers = unknown,
    User = unknown
> {
    body: Body
    params: Params
    query: Query
    headers: Headers
    user?: User
}

export interface IReply {
    statusCode: number
    body?: unknown
}

