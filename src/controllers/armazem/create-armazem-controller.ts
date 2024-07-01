import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createArmazemModel } from '@/models/armazem/create-armazem-model'
import { auth } from '@/routes/middlewares/auth'
import { getErrorMessage } from '@/utils/get-error-message'

export async function createArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'criar armazem',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            lojaId: z.number(),
            description: z.string().optional(),
            localidade: z.string().optional(),
            bloqueioEntrada: z.boolean(),
            bloqueioSaida: z.boolean(),
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-armazem')
        const data = request.body
        try {
          const armazem = await createArmazemModel(data)
          return reply.code(201).send(armazem)
        } catch (error) {
          return reply.send(getErrorMessage(error))
        }
      },
    )
}
