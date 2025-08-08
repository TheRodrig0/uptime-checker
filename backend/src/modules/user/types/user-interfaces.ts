export interface IUserService<CreateDTO, ReplyDTO> {
    findByOne(email: string): Promise<ReplyDTO>
    create(createDTO: CreateDTO): Promise<ReplyDTO>
}

export interface IUserRepository<Entity> {
    findByOne(email: string): Promise<Entity | null>
    create(entity: Entity): Promise<Entity | null>
}