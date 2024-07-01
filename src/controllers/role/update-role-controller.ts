import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { updateRoleModel } from '@/models/role/update-role-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateRoleController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:roleId',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Atualizar as informações de uma name',
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
          body: z.object({
            name: z.string(),
            description: z.string().optional(),
          }),
          response: {
            204: z.object({
              role: z.object({
                id: z.number(),
                name: z.string(),
                description: z.string().nullable(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-role')
        const { roleId } = request.params
        const { name, description } = request.body
        await Prisma.role.findError(roleId)

        const role = await updateRoleModel({ name, description, id: roleId })

        return reply.status(204).send({ role })
      },
    )
}
