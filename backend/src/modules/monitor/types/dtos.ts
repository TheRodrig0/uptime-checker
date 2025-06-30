export interface MonitorRequestDTO {
    name: string,
    url: string,
    isActive: boolean,
    interval: number,
}

export interface MonitorReplyDTO {
    id: string,
    name: string,
    url: string,
    isActive: boolean,
    interval: number,
    status: string,
}
