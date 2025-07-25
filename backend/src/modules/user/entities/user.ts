import type { IEntity } from "../../shared/types/entity-interface"
import type { UserDTO } from "../types/user-dtos"
import { ID } from "../../shared/value-objects/id-value-object"
import { Email } from "../value-objects/email-value-object"
import { Name } from "../value-objects/name-value-object"

export class User implements IEntity<UserDTO> {
    private readonly id: ID
    private readonly email: Email
    private readonly name: Name
    constructor({ id, email, name }: { id?: string, email: string, name: string }) {
        this.id = new ID(id || crypto.randomUUID())
        this.email = new Email(email)
        this.name = new Name(name)
    }

    toJSON(): UserDTO {
        return {
            id: this.id.getValue(),
            email: this.email.getValue(),
            name: this.name.getValue()
        }
    }
}