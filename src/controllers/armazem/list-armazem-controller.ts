import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { listArmazemModel } from '@/models/armazem/list-armazem-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function listArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
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

        try {
          const armazem = await listArmazemModel()
          return reply.code(200).send({ armazem })
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
