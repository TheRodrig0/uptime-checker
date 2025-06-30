import type { CrudControllerInterface } from "../../types/crud-controller-interface"
import type { CrudServiceInterface } from "../../types/crud-service-interface"
import type { ReplyInterface } from "../../../types/common/reply-interface"
import type { RequestInterface } from "../../../types/common/request-interface"
import type { MonitorRequestDTO, MonitorReplyDTO } from "../types/dtos"
import type { 
    CreateMonitorRequestType,
    FindMonitorByIdRequestType,
    UpdateMonitorRequestType,
    DeleteMonitorRequestType
 } from "../types/requests-types"

export class MonitorController implements CrudControllerInterface<MonitorRequestDTO> {
    constructor(private readonly service: CrudServiceInterface<MonitorRequestDTO, MonitorReplyDTO>) { }

    async findAll(_request: RequestInterface, reply: ReplyInterface): Promise<ReplyInterface> {
        const data = await this.service.findAll()

        return reply.code(200)
            .send({
                data
            })
    }

    async findById(request: FindMonitorByIdRequestType, reply: ReplyInterface): Promise<ReplyInterface> {
        const { id } = request.params

        const data = await this.service.findById(id)

        return reply.code(200)
            .send({
                data
            })
    }

    async create(request: CreateMonitorRequestType, reply: ReplyInterface): Promise<ReplyInterface> {
        const data = await this.service.create(request.body)

        return reply.code(201)
            .send({
                data
            })
    }

    async update(request: UpdateMonitorRequestType, reply: ReplyInterface): Promise<ReplyInterface> {
        const { id } = request.params

        const data = await this.service.update(id, request.body)

        return reply.code(200)
            .send({
                data
            })
    }

    async delete(request: DeleteMonitorRequestType, reply: ReplyInterface): Promise<ReplyInterface> {
        const { id } = request.params

        await this.service.delete(id)

        return reply.code(204)
            .send()
    }
}