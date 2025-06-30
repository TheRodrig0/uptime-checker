import type { RequestInterface } from "../../../types/common/request-interface"
import type { MonitorRequestDTO, MonitorReplyDTO } from "./dtos"

interface id {
    id: string
}

export type CreateMonitorRequestType = RequestInterface<MonitorRequestDTO>
export type UpdateMonitorRequestType = RequestInterface<MonitorRequestDTO, id>
export type FindMonitorByIdRequestType = RequestInterface<unknown, id>
export type DeleteMonitorRequestType = RequestInterface<unknown, id>