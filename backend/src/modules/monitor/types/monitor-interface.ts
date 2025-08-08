export interface IMonitorService<CreateDTO, UpdateDTO, ReplyDTO> {
    findByOne(id: string, userId: string): Promise<ReplyDTO>
    findAll(userId: string, query: { status?: string, page?: number }): Promise<ReplyDTO[]>
    create(userId: string, createDTO: CreateDTO): Promise<ReplyDTO>
    update(id: string, userId: string, updateDTO: UpdateDTO): Promise<ReplyDTO>
    delete(id: string, userId: string): Promise<void>
}

export interface IMonitorRepository<Entity> {
    findByOne(id: string, userId: string): Promise<Entity | null>
    findAll(userId: string, query: { status?: string, page?: number }): Promise<Entity[]>
    create(entity: Entity): Promise<Entity | null>
    update(entity: Entity): Promise<Entity | null>
    delete(id: string, userId: string): Promise<boolean>
}