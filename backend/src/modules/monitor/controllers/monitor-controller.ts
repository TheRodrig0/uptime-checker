import type { CreateMonitorDTO, UpdateMonitorDTO, MonitorDTO } from "../types/monitor-dtos"
import type { IMonitorService } from "../types/monitor-interface"
import type { IReply } from "../../shared/types/http-interfaces"
import { Controller, Get, Post, Patch, Delete } from "../../shared/decorators/routes-decorators"
import { Body, Params, Query, User } from "../../shared/decorators/request-decorators"
import { inject, injectable } from "inversify"
import { MONITOR_TYPES } from "../types/monitor-inversify-types"

@Controller("monitors/")
@injectable()
export class MonitorController {
    constructor(@inject(MONITOR_TYPES.MonitorService) private readonly monitorService: IMonitorService<CreateMonitorDTO, UpdateMonitorDTO, MonitorDTO>) { }

    @Get("/:id")
    async findByOne(@Params("id") id: string, @User("id") userId: string): Promise<IReply> {
        const monitor = await this.monitorService.findByOne(id, userId)

        return {
            statusCode: 200,
            body: monitor
        }
    }

    @Get()
    async findAll(@Query() query: { status?: string, page?: number }, @User("id") userId: string): Promise<IReply> {
        const monitors = await this.monitorService.findAll(userId, query)

        return {
            statusCode: 200,
            body: monitors
        }
    }

    @Post()
    async create(@Body() createMonitorDto: CreateMonitorDTO, @User("id") userId: string): Promise<IReply> {
        const createdMonitor = await this.monitorService.create(userId, createMonitorDto)

        return {
            statusCode: 201,
            body: createdMonitor
        }
    }

    @Patch("/:id")
    async update(@Body() updateMonitorDto: UpdateMonitorDTO, @Params("id") id: string, @User("id") userId: string): Promise<IReply> {
        const updatedMonitor = await this.monitorService.update(id, userId, updateMonitorDto)

        return {
            statusCode: 200,
            body: updatedMonitor
        }
    }

    @Delete("/:id")
    async delete(@Params("id") id: string, @User("id") userId: string): Promise<IReply> {
        await this.monitorService.delete(id, userId)

        return {
            statusCode: 204
        }
    }
}