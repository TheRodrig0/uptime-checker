import type { ICrudController, ICrudService, ICrudRepository } from '../shared/types/crud-interfaces'
import type { MonitorDTO, CreateMonitorDTO, UpdateMonitorDTO } from './types/monitor-dtos'
import { MonitorController } from './controllers/monitor-controller'
import { MonitorService } from './services/monitor-service'
import { InMemoryMonitorRepository } from './repositories/in-memory-monitor-repository'
import { Monitor } from './entities/monitor'
import { Container, ContainerModule } from 'inversify'
import { TYPES } from './types/inversify-types'

const monitorModule = new ContainerModule(({ bind }) => {
    bind<ICrudRepository<Monitor, { id: string }>>(TYPES.MonitorRepository).to(InMemoryMonitorRepository)

    bind<ICrudService<CreateMonitorDTO, UpdateMonitorDTO, MonitorDTO, { id: string }>>(TYPES.MonitorService).to(MonitorService)

    bind<ICrudController<CreateMonitorDTO, UpdateMonitorDTO>>(TYPES.MonitorController).to(MonitorController)
})

const monitorContainer = new Container()
monitorContainer.load(monitorModule)

export { monitorContainer }