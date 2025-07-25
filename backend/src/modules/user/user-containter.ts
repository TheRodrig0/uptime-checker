import type { IBaseCrudService, IBaseCrudRepository } from '../shared/types/crud-interfaces'
import type { CreateUserDTO, UserDTO } from './types/user-dtos'
import { UserService } from './services/user-service'
import { InMemoryUserRepository } from './repositories/in-memory-user-repository'
import { User } from './entities/user'
import { Container, ContainerModule } from 'inversify'
import { TYPES } from './types/inversify-types'

const userModule = new ContainerModule(({ bind }) => {
    bind<IBaseCrudRepository<User, { email: string }>>(TYPES.UserRepository).to(InMemoryUserRepository)

    bind<IBaseCrudService<CreateUserDTO, UserDTO, { email: string }>>(TYPES.UserService).to(UserService)
})

const userContainer = new Container()
userContainer.load(userModule)

export { userContainer }