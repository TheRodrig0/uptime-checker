export interface CrudRepositoryInterface<Entity, IdType = string> {
    findAll(): Promise<Entity[]>
    findById(id: IdType): Promise<Entity | null>
    create(data: Entity): Promise<Entity>
    update(id: IdType, data: Entity): Promise<Entity | null>
    delete(id: IdType): Promise<void>
}