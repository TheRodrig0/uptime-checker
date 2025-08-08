import type { IMonitorService, IMonitorRepository } from './types/monitor-interface'
import type { MonitorDTO, CreateMonitorDTO, UpdateMonitorDTO } from './types/monitor-dtos'
import { MonitorController } from './controllers/monitor-controller'
import { MonitorService } from './services/monitor-service'
import { InMemoryMonitorRepository } from './repositories/in-memory-monitor-repository'
import { Monitor } from './entities/monitor'
import { Container, ContainerModule } from 'inversify'
import { MONITOR_TYPES } from './types/monitor-inversify-types'

const monitorModule = new ContainerModule(({ bind }) => {
    bind<IMonitorRepository<Monitor>>(MONITOR_TYPES.MonitorRepository).to(InMemoryMonitorRepository)

    bind<IMonitorService<CreateMonitorDTO, UpdateMonitorDTO, MonitorDTO>>(MONITOR_TYPES.MonitorService).to(MonitorService)

    bind(MONITOR_TYPES.MonitorController).to(MonitorController)
})

const monitorContainer = new Container()
monitorContainer.load(monitorModule)

export { monitorContainer }