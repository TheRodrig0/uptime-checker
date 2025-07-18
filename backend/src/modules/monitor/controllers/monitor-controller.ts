import type { IRequest, IReply } from "../../../types/common/http-interfaces"
import type { ICrudController, ICrudService } from "../../shared/types/crud-interfaces"
import type { MonitorDTO, CreateMonitorDTO, UpdateMonitorDTO } from "../types/monitor-dtos"
import { TYPES } from "../types/inversify-types"
import { injectable, inject } from "inversify"
import { Controller, Get, Patch, Post, Delete } from "../../shared/decorators/routes-decorators"

@injectable()
@Controller("/monitor")
export class MonitorController implements ICrudController<CreateMonitorDTO, UpdateMonitorDTO> {
    constructor(@inject(TYPES.MonitorService) private readonly service: ICrudService<CreateMonitorDTO, UpdateMonitorDTO, MonitorDTO, { id: string }>) { }

    @Get()
    async findAll(_request: IRequest): Promise<IReply> {
        const monitors = await this.service.findAll()

        return {
            statusCode: 200,
            body: monitors
        }
    }

    @Get("/:id")
    async findOne(request: IRequest<unknown, { id: string }>): Promise<IReply> {
        const { id } = request.params

        const monitor = await this.service.findOne({ id })

        return {
            statusCode: 200,
            body: monitor
        }
    }

    @Post()
    async create(request: IRequest<CreateMonitorDTO>): Promise<IReply> {
        const monitor = await this.service.create(request.body)

        return {
            statusCode: 201,
            body: monitor
        }
    }

    @Patch("/:id")
    async update(request: IRequest<UpdateMonitorDTO, { id: string }>): Promise<IReply> {
        const { id } = request.params

        const monitor = await this.service.update({ id }, request.body)

        return {
            statusCode: 200,
            body: monitor
        }
    }

    @Delete("/:id")
    async delete(request: IRequest<unknown, { id: string }>): Promise<IReply> {
        const { id } = request.params

        await this.service.delete({ id })

        return {
            statusCode: 204
        }
    }
}