import type { IBaseCrudRepository, IBaseCrudService } from "../../shared/types/crud-interfaces"
import type { CreateUserDTO, UserDTO } from "../types/user-dtos"
import { User } from "../entities/user"
import { NotFoundError } from "../../shared/custom-errors/not-found-error"
import { TYPES } from "../types/inversify-types"
import { injectable, inject } from "inversify"

@injectable()
export class UserService implements IBaseCrudService<CreateUserDTO, UserDTO, { email: string }> {
    constructor(@inject(TYPES.UserRepository) private readonly repository: IBaseCrudRepository<User, { email: string }>) { }

    async findOne(filter: { email: string }): Promise<UserDTO | null> {
        const user = await this.repository.findOne(filter)

        if (!user) {
            throw new NotFoundError(`User with email ${filter.email} not found`)
        }

        return user.toJSON()
    }

    async create(data: CreateUserDTO): Promise<UserDTO> {
        const userEntity = new User(data)
        const user = await this.repository.create(userEntity)

        return user.toJSON()
    }
}