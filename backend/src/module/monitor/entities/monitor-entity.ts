import type { EntityInterface } from "../../types/entity-interface"
import type { MonitorReplyDTO } from "../types"
import { ID } from "../../value-objects/id"
import { MonitorName } from "./monitor-name"
import { Url } from "../../value-objects/url"
import { Status } from "./status"
import { Interval } from "./interval"

export class MonitorEntity implements EntityInterface<MonitorReplyDTO> {
    private id: ID | null
    private name: MonitorName
    private url: Url
    private isActive: boolean
    private status: Status | null
    private interval: Interval

    constructor({ id, name, url, isActive, status, interval }: {
        id?: string
        name: string
        url: string
        isActive: boolean
        status?: string
        interval?: number
    }) {
        this.id = id ? new ID(id) : null
        this.name = new MonitorName(name)
        this.url = new Url(url)
        this.isActive = isActive ?? true
        this.status = status ? new Status(status) : null
        this.interval = new Interval(interval || 30)
    }

    setName(name: string): void {
        this.name = new MonitorName(name)
    }

    setUrl(url: string): void {
        this.url = new Url(url)
    }

    setIsActive(isActive: boolean): void {
        this.isActive = isActive
    }

    setId(id: string): void {
        this.id = new ID(id)
    }

    setStatus(status: string): void {
        this.status = new Status(status)
    }

    setInterval(interval: number): void {
        this.interval = new Interval(interval)
    }

    toJSON(): MonitorReplyDTO {
        return {
            id: this.id!.getValue(),
            name: this.name.getValue(),
            url: this.url.getValue(),
            isActive: this.isActive,
            status: this.status?.getValue() as "up" | "down" | "unknown" | undefined,
            interval: this.interval.getValue()
        }
    }
}