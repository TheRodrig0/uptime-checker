export interface MonitorDTO {
    id: string
    userId: string
    url: string
    title: string
    status: string
}

export type CreateMonitorDTO = Omit<MonitorDTO, "id" | "status">

export type UpdateMonitorDTO = Partial<Omit<MonitorDTO, "id" | "userId">>