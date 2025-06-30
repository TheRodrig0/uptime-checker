import type { EntityInterface } from "../../types/entity-interface"
import type { MonitorRequestDTO, MonitorReplyDTO } from "../types/dtos"
import { ID } from "../../value-objects/id"
import { MonitorName } from "./monitor-name"
import { Url } from "../entities/url"
import { Status } from "./status"
import { Interval } from "./interval"

export class MonitorEntity implements EntityInterface<MonitorReplyDTO> {
    private id: ID | null
    private name: MonitorName
    private url: Url
    private isActive: boolean
    private status: Status
    private interval: Interval

    constructor(props: {
        id?: string | null
        name: string
        url: string
        isActive: boolean
        status?: string
        interval: number
    }) {
        this.id = props.id ? new ID(props.id) : null
        this.name = new MonitorName(props.name)
        this.url = new Url(props.url)
        this.isActive = props.isActive ?? true
        this.interval = new Interval(props.interval || 30)
        this.status = new Status(props.status || 'unknown')
    }

    update(data: Partial<MonitorRequestDTO>): void {
        if (data.name !== undefined) {
            this.name = new MonitorName(data.name)
        }

        if (data.url !== undefined) {
            this.url = new Url(data.url)
        }

        if (data.interval !== undefined) {
            this.interval = new Interval(data.interval)
        }

        if (data.isActive !== undefined) {
            if (data.isActive) {
                this.activate()
            } else {
                this.deactivate()
            }
        }
    }

    activate(): void {
        this.isActive = true
        this.status = new Status('unknown')
    }

    deactivate(): void {
        this.isActive = false
        this.status = new Status('unknown')
    }

    setID(id: string): void {
        this.id = new ID(id)
    }

    getProps(): Partial<MonitorReplyDTO> {
        return {
            id: this.id?.getValue(),
            name: this.name.getValue(),
            url: this.url.getValue(),
            isActive: this.isActive,
            status: this.status.getValue(),
            interval: this.interval.getValue(),
        }
    }

    toJSON(): MonitorReplyDTO {
        if (this.id === null) {
            throw new Error("Error ID does not exist")
        }

        return {
            id: this.id.getValue(),
            name: this.name.getValue(),
            url: this.url.getValue(),
            isActive: this.isActive,
            status: this.status.getValue(),
            interval: this.interval.getValue(),
        }
    }
}