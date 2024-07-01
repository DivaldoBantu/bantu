import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getLojaModel } from '@/models/loja/get-loja-model'
import { auth } from '@/routes/middlewares/auth'
import { getErrorMessage } from '@/utils/get-error-message'
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
        // getArmazemModel
        await request.verifyPermission('read-armazem')

        await Prisma.armazem.findError(armazemId)

        try {
          const loja = await getLojaModel(armazemId)
          return reply.status(204).send(loja)
        } catch (error) {
          return reply.send(getErrorMessage(error))
        }
      },
    )
}
