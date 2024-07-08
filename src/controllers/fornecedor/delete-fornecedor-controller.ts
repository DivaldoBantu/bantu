import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { deleteFornecedorModel } from '@/models/fornecedor/delete-fornecedor-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteFornecedorController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:fornecedorId',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'Apagar um fornecedor',
          security: [{ bearerAuth: [] }],
          params: z.object({
            fornecedorId: z.string().transform((val, ctx) => {
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
        const { fornecedorId } = request.params
        await request.verifyPermission('delete-fornecedor')

        try {
          await Prisma.fornecedor.findError(fornecedorId)
          await deleteFornecedorModel(fornecedorId)
          return reply
            .status(204)
            .send({ message: 'Fornecedor deletado com sucesso' })
        } catch (err) {
          const { message } = getError(err)
          throw new BadRequestError(message)
        }
      },
    )
}
