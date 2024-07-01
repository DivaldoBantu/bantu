import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteUserModel } from '@/models/user/delete-user-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteControllersUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:memberId',
      {
        schema: {
          tags: ['Members'],
          summary: 'Delete a member',
          security: [{ bearerAuth: [] }],
          params: z.object({
            memberId: z.string().transform((val, ctx) => {
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
          response: {
            204: z.string(),
          },
        },
      },
      async (request, reply) => {
        const { memberId } = request.params
        await request.verifyPermission('delete-user')

        const deleteUser = await Prisma.user.findError(memberId)
        if (!deleteUser) {
          throw new Error('User not found')
        }
        deleteUserModel(memberId)
        return reply.status(204).send('Usuario deletado com sucesso')
      },
    )
}
