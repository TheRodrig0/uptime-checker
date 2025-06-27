export interface CrudServiceInterface<RequestDTO, ReplyDTO, IdType = string> {
    findAll(): Promise<ReplyDTO[]>
    findById(id: IdType): Promise<ReplyDTO | null>
    create(data: RequestDTO): Promise<ReplyDTO>
    update(id: IdType, data: RequestDTO): Promise<ReplyDTO | null>
    delete(id: IdType): Promise<void>
  }