import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getRoleModel } from '@/models/role/get-role-model'
import { getRolePermissionsModel } from '@/models/role/get-role-permissions-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getRoleController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:roleId',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Pesquisar role pelo id',
          //security: [{ bearerAuth: [] }],
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
            200: z.object({
              role: z.object({
                id: z.number(),
                name: z.string(),
                description: z.string().nullable(),
              }),
              permissions: z.any(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { roleId } = request.params
        //await request.verifyPermission('read-role')
        await Prisma.role.findError(roleId)
        const role = await getRoleModel(roleId)
        const permissions = await getRolePermissionsModel(roleId)
        return reply.send({ role, permissions })
      },
    )
}
