import 'fastify'

interface UserPayload {
    id: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    user?: UserPayload
  }
}