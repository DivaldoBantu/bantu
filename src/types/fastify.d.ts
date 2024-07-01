import 'fastify'

import type { User } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    user: {
      id: string
    }
  }
  export interface FastifyRequest {
    getCurrentUserId(): Promise<number>
    getUserPermission(id?: number): Promise<{
      permissions: {
        slug: string
      }[]
      user: User
    }>
    getUserRoles(): Promise<{
      roles: {
        id: number
        name: string
      }[]
    }>
    verifyPermission(permission: string): Promise<void>
  }
}
