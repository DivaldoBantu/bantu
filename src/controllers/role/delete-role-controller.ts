import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteRoleModel } from '@/models/role/delete-role-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteRoleController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:roleId',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Apagar uma role',
          security: [{ bearerAuth: [] }],
          params: z.object({
            roleId: z.string().transform((val, ctx) => {
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
        await request.verifyPermission('delete-role')
        const { roleId } = request.params

        await Prisma.role.findError(roleId)
        await deleteRoleModel(roleId)

        return reply.status(204).send('Role apagada com sucesso')
      },
    )
}
