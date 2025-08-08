import type { IUserService, IUserRepository } from "../types/user-interfaces"
import type { CreateUserDTO, UserDTO } from "../types/user-dtos"
import { User } from "../entities/user"
import { NotFoundError } from "../../shared/custom-errors/not-found-error"
import { USER_TYPES } from "../types/user-inversify-types"
import { injectable, inject } from "inversify"
import { InternalServerError } from "../../shared/custom-errors/internal-server-error"

@injectable()
export class UserService implements IUserService<CreateUserDTO, UserDTO> {
    constructor(@inject(USER_TYPES.UserRepository) private readonly repository: IUserRepository<User>) { }

    async findByOne(email: string): Promise<UserDTO> {
        const user = await this.repository.findByOne(email)

        if (!user) {
            throw new NotFoundError(`User with email ${email} not found`)
        }

        return user.toJSON()
    }

    async create(createDTO: CreateUserDTO): Promise<UserDTO> {
        const userEntity = new User(createDTO)
        const user = await this.repository.create(userEntity)

        if (!user) {
            throw new InternalServerError("Unfortunately the user could not be created")
        }

        return user.toJSON()
    }
}