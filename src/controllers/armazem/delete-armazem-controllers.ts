import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { deleteArmazemModel } from '@/models/armazem/delete-armazem-model'
import { auth } from '@/routes/middlewares/auth'
import { getErrorMessage } from '@/utils/get-error-message'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:armazemId',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'Apagar armazemId',
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
            201: z.object({ message: z.string() }),
          },
        },
      },
      async (request, reply) => {
        const { armazemId } = request.params
        await request.verifyPermission('delete-armazem')

        await Prisma.armazem.findError(armazemId)
        try {
          await deleteArmazemModel(armazemId)
          return reply
            .status(201)
            .send({ message: 'Armazem apagado com sucesso' })
        } catch (error) {
          throw new BadRequestError(getErrorMessage(error))
        }
      },
    )
}
