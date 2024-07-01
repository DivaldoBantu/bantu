import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listArmazemModel } from '@/models/armazem/list-armazem-model'
import { auth } from '@/routes/middlewares/auth'

export async function listArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'listas Armazem',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              armazem: z
                .object({
                  id: z.number(),
                  name: z.string(),
                  lojaId: z.number(),
                  description: z.string().nullable(),
                  localidade: z.string().nullable(),
                  bloqueioEntrada: z.boolean(),
                  bloqueioSaida: z.boolean(),
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-armazem')

        const armazem = await listArmazemModel()
        return reply.code(200).send({ armazem })
      },
    )
}
