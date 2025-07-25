export interface UserDTO {
    id: string
    email: string
    name: string
}

export type CreateUserDTO = Omit<UserDTO, "id">
