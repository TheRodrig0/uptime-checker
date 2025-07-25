import { IBaseCrudRepository } from "../../shared/types/crud-interfaces"
import { User } from "../entities/user"

export class InMemoryUserRepository implements IBaseCrudRepository<User, { email: string }> {
    private users: Map<string, User> = new Map()

    async findOne(filter: { email: string }): Promise<User | null> {
        const users = [...this.users.values()]

        const filteredUser = users.find(user => user.toJSON().email === filter.email)

        return filteredUser || null
    }

    async create(entity: User): Promise<User> {
        const { id } = entity.toJSON()
        this.users.set(id, entity)

        return entity
    }
}