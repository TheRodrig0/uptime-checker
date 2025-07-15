import type { IEntity } from "../../shared/types/entity-interface"
import type { MonitorDTO } from "../types/monitor-dtos"
import { ID } from "../../shared/value-objects/id-value-object"
import { Url } from "../value-objects/url-value-object"
import { Title } from "../value-objects/title-value-object"
import { Status } from "../value-objects/status-value-object"

export class Monitor implements IEntity<MonitorDTO> {
    private readonly id: ID
    private readonly userId: ID
    private readonly url: Url
    private readonly title: Title
    private readonly status: Status

    constructor({ id, userId, url, title, status }: { id?: string, userId: string, url: string, title: string, status?: string }) {
        this.id = new ID(id || crypto.randomUUID())
        this.userId = new ID(userId)
        this.url = new Url(url)
        this.title = new Title(title)
        this.status = new Status(status || "unknown")
    }

    toJSON(): MonitorDTO {
        return {
            id: this.id.getValue(),
            userId: this.userId.getValue(),
            url: this.url.getValue(),
            title: this.title.getValue(),
            status: this.status.getValue()
        }
    }
}