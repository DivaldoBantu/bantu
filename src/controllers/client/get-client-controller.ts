import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getClientModel } from '@/models/client/get-client-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getClientController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:clientId',
      {
        schema: {
          tags: ['cliente'],
          summary: 'Encontrar cliente',
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
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-cliente')
        const { clientId } = request.params
        await Prisma.client.findError(clientId)
        const client = await getClientModel(clientId)
        return reply.code(201).send(client)
      },
    )
}
