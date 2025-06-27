import type { CrudControllerInterface } from "../../types/crud-controller-interface"
import type { CrudServiceInterface } from "../../types/crud-service-interface"
import type { ReplyInterface } from "../../../types/common/reply-interface"
import type { RequestInterface } from "../../../types/common/request-interface"
import type { MonitorRequestDTO, MonitorReplyDTO} from "../types"

export class MonitorController implements CrudControllerInterface<MonitorRequestDTO> {
    constructor(private readonly service: CrudServiceInterface<MonitorRequestDTO, MonitorReplyDTO>) { }

    async findAll(_request: RequestInterface, reply: ReplyInterface): Promise<ReplyInterface> {
        const data = await this.service.findAll()

        return reply.code(200)
            .send({
                data
            })
    }

    async findById(request: RequestInterface<unknown, { id: string }>, reply: ReplyInterface): Promise<ReplyInterface> {
        const { id } = request.params

        const data = await this.service.findById(id)

        return reply.code(200)
            .send({
                data
            })
    }

    async create(request: RequestInterface<MonitorRequestDTO>, reply: ReplyInterface): Promise<ReplyInterface> {
        const { name, url, isActive, interval } = request.body

        const data = await this.service.create({
            name,
            url,
            isActive,
            interval
        })

        return reply.code(201)
            .send({
                data
            })
    }

    async update(request: RequestInterface<MonitorRequestDTO, { id: string }>, reply: ReplyInterface): Promise<ReplyInterface> {
        const { name, url, isActive, interval } = request.body
        const { id } = request.params

        const data = await this.service.update(id, {
            name,
            url,
            isActive,
            interval
        })

        return reply.code(200)
            .send({
                data
            })
    }

    async delete(request: RequestInterface<unknown, { id: string }>, reply: ReplyInterface): Promise<ReplyInterface> {
        const { id } = request.params

        await this.service.delete(id)

        return reply.code(204)
            .send()
    }
}