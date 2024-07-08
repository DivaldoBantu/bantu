import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteClientModel } from '@/models/client/delete-client-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteClienteController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:clientId',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'Apagar um cliente',
          security: [{ bearerAuth: [] }],
          params: z.object({
            clientId: z.string().transform((val, ctx) => {
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
        const { clientId } = request.params
        await request.verifyPermission('delete-cliente')

        await Prisma.client.findError(clientId)

        const Client = await deleteClientModel(clientId)
        if (!Client) {
          throw new Error('cliente não encontrado')
        }
        return reply
          .status(204)
          .send({ message: 'Cliente deletado com sucesso' })
      },
    )
}
