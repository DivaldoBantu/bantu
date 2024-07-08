import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { listLojaModel } from '@/models/loja/list-loja-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function listLojasController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Loja'],
          summary: 'listas lojas',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              lojas: z
                .object({
                  id: z.number(),
                  name: z.string(),
                  identificacao: z.string(),
                  address: z.string(),
                  provinciaId: z.number(),
                  telefone: z.string(),
                  telefone2: z.string().nullable(),
                  email: z.string().email(),
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-loja')

        try {
          const lojas = await listLojaModel()
          return reply.code(200).send({ lojas })
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
