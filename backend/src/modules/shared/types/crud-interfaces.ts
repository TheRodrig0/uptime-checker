import type { IRequest, IReply } from "../../../types/common/http-interfaces"

export interface IBaseCrudController<CreateDTO> {
    findOne(request: IRequest<unknown, { id: string }>): Promise<IReply>
    create(request: IRequest<CreateDTO>): Promise<IReply>
}

export interface IBaseCrudService<CreateDTO, ReplyDTO, UniqueFilter> {
    findOne(filter: UniqueFilter): Promise<ReplyDTO | null>
    create(data: CreateDTO): Promise<ReplyDTO>
}

export interface IBaseCrudRepository<Entity, UniqueFilter> {
    findOne(filter: UniqueFilter): Promise<Entity | null>
    create(entity: Entity): Promise<Entity>
}

export interface ICrudController<CreateDTO, UpdateDTO> extends IBaseCrudController<CreateDTO> {
    findAll(request: IRequest): Promise<IReply>
    update(request: IRequest<UpdateDTO, { id: string }>): Promise<IReply>
    delete(request: IRequest<unknown, { id: string }>): Promise<IReply>
}

export interface ICrudService<CreateDTO, UpdateDTO, ReplyDTO, UniqueFilter> extends IBaseCrudService<CreateDTO, ReplyDTO, UniqueFilter> {
    findAll(where?: Partial<ReplyDTO>): Promise<ReplyDTO[]>
    update(filter: UniqueFilter, data: UpdateDTO): Promise<ReplyDTO | null>
    delete(filter: UniqueFilter): Promise<void>
}

export interface ICrudRepository<Entity, UniqueFilter> extends IBaseCrudRepository<Entity, UniqueFilter> {
    findAll(): Promise<Entity[]>
    update(filter: UniqueFilter, entity: Entity): Promise<Entity | null>
    delete(filter: UniqueFilter): Promise<boolean>
}