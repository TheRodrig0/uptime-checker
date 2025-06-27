import type { RequestInterface } from "../../types/common/request-interface"
import type { ReplyInterface } from "../../types/common/reply-interface"

export interface CrudControllerInterface<REQ_BODY> {
    findAll(request: RequestInterface, reply: ReplyInterface): Promise<ReplyInterface>

    findById(
        request: RequestInterface<unknown, { id: string }>,
        reply: ReplyInterface
    ): Promise<ReplyInterface>

    create(
        request: RequestInterface<REQ_BODY>,
        reply: ReplyInterface
    ): Promise<ReplyInterface>

    update(
        request: RequestInterface<REQ_BODY, { id: string }>,
        reply: ReplyInterface
    ): Promise<ReplyInterface>

    delete(
        request: RequestInterface<unknown, { id: string }>,
        reply: ReplyInterface
    ): Promise<ReplyInterface>
}