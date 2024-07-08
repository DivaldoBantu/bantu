import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { getLojaModel } from '@/models/loja/get-loja-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'

export async function getArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:armazemId',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'Pesquisar armazem por id',
          security: [{ bearerAuth: [] }],
          params: z.object({
            armazemId: z.string().transform((val, ctx) => {
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
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        const { armazemId } = request.params
        await request.verifyPermission('read-armazem')

        try {
          await Prisma.armazem.findError(armazemId)
          const armazem = await getLojaModel(armazemId)
          return reply.status(204).send(armazem)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
