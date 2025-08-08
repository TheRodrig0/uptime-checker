import type { IUserRepository } from "../types/user-interfaces"
import { User } from "../entities/user"

export class InMemoryUserRepository implements IUserRepository<User> {
    private usersById: Map<string, User> = new Map()
    private usersByEmail: Map<string, User> = new Map()

    async findByOne(email: string): Promise<User | null> {
        const user = this.usersByEmail.get(email)
        
        return user || null
    }

    async create(entity: User): Promise<User | null> {
        const { id, email } = entity.toJSON()

        if (this.usersById.has(id) || this.usersByEmail.has(email)) {
            return null
        }

        this.usersById.set(id, entity)
        this.usersByEmail.set(email, entity)

        return entity
    }
}