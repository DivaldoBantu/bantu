import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { getUserProfileModel } from '@/models/user/get-user-profile-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'
export async function getUserRolesController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/roles',
      {
        schema: {
          tags: ['Settings'],
          summary: 'Pegar as roles do usuário logado',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              roles: z
                .object({
                  id: z.number(),
                  name: z.string(),
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        try {
          await Prisma.user.findError(userId)
          const user = await getUserProfileModel(userId)
          if (!user) return
          const { roles } = await request.getUserRoles()
          return reply.send({ roles })
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
