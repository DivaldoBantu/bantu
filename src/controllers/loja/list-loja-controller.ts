import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listLojaModel } from '@/models/loja/list-loja-model'
import { auth } from '@/routes/middlewares/auth'

export async function listLojasController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '',
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
                  indentificao: z.string(),
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

        const lojas = await listLojaModel()
        return reply.code(200).send({ lojas })
      },
    )
}
