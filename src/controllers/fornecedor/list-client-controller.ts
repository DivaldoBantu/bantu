import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listClientModel } from '@/models/client/list-client-model'
import { auth } from '@/routes/middlewares/auth'

export async function listClienteController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'listas lojas',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-cliente')

        const clientes = await listClientModel()
        return reply.code(200).send({ clientes })
      },
    )
}
