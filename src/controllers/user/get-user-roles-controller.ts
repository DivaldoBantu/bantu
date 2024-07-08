import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'
export async function getUserRolesController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:memberId/roles',
      {
        schema: {
          tags: ['Settings'],
          summary: 'Pegar as roles do usuário logado',
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
        const { memberId } = request.params
        try {
          await Prisma.user.findError(memberId)
          const roles = await request.getUserRoles(memberId)
          return reply.send({ roles })
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
