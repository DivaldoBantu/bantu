import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { updateUserModel } from '@/models/user/update-user-role-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'

export async function updateUserRoles(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:memberId',
      {
        schema: {
          tags: ['Members'],
          summary: 'atualizar roles de um usuário',
          security: [{ bearerAuth: [] }],
          params: z.object({
            userId: z.string().transform((val, ctx) => {
              const parsed = parseInt(val)
              if (isNaN(parsed)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Not a number',
                })

                return z.NEVER
              }
              return parsed
            }),
          }),
          body: z.object({
            role: z.object({
              id: z.number(),
              value: z.boolean(),
            }),
          }),
          response: {
            204: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-user')
        const { userId } = request.params
        const { role } = request.body

        try {
          await Prisma.user.findError(userId)
          const update = await updateUserModel({ userId, role })
          return reply.status(204).send(update)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
