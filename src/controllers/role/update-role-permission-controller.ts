import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'

export async function updateRolePermissionController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:roleId/permission',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Atualiza as permissões de uma role',
          security: [{ bearerAuth: [] }],
          params: z.object({
            roleId: z.string().transform((val, ctx) => {
              const parsed = parseInt(val)
              if (isNaN(parsed)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Não é um número',
                })
                return z.NEVER
              }
              return parsed
            }),
          }),
          body: z.object({
            permissionId: z.number(),
            has: z.boolean(),
          }),
          response: {
            204: z.string(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-role')
        const { roleId } = request.params
        const { permissionId, has } = request.body

        try {
          await Prisma.role.findError(roleId)
          await Prisma.permission.findError(permissionId)

          if (has) {
            // Adiciona a permissão
            await prisma.rolePermission.upsert({
              where: {
                roleId_permissionId: {
                  roleId,
                  permissionId,
                },
              },
              update: {}, // Não é necessário fazer nada, a permissão já existe
              create: {
                roleId,
                permissionId,
              },
            })
          } else {
            // Remove a permissão
            await prisma.rolePermission.deleteMany({
              where: {
                roleId,
                permissionId,
              },
            })
          }
          console.log('role updated')
          return reply.status(204).send('Permissão atualizada com sucesso!')
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
