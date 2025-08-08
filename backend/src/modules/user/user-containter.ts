import type { IUserService, IUserRepository } from './types/user-interfaces'
import type { CreateUserDTO, UserDTO } from './types/user-dtos'
import { UserService } from './services/user-service'
import { InMemoryUserRepository } from './repositories/in-memory-user-repository'
import { User } from './entities/user'
import { Container, ContainerModule } from 'inversify'
import { USER_TYPES } from './types/user-inversify-types'

const userModule = new ContainerModule(({ bind }) => {
    bind<IUserRepository<User>>(USER_TYPES.UserRepository).to(InMemoryUserRepository)

    bind<IUserService<CreateUserDTO, UserDTO>>(USER_TYPES.UserService).to(UserService)
})

const userContainer = new Container()
userContainer.load(userModule)

export { userContainer }