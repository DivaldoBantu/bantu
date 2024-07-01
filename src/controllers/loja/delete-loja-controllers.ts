import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { deleteLojaModel } from '@/models/loja/delete-loja-model'
import { auth } from '@/routes/middlewares/auth'
import { getErrorMessage } from '@/utils/get-error-message'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteLojaController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:clientId',
      {
        schema: {
          tags: ['Loja'],
          summary: 'Apagar uma loja',
          security: [{ bearerAuth: [] }],
          params: z.object({
            lojaId: z.string().transform((val, ctx) => {
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
            204: z.object({ message: z.string() }),
          },
        },
      },
      async (request, reply) => {
        const { lojaId } = request.params
        await request.verifyPermission('delete-loja')

        await Prisma.loja.findError(lojaId)
        try {
          await deleteLojaModel(lojaId)
          return reply.status(204).send({ message: 'Loja apagada com sucesso' })
        } catch (error) {
          throw new BadRequestError(getErrorMessage(error))
        }
      },
    )
}
