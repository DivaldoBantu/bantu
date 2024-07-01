import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createLojaModel } from '@/models/loja/create-loja-model'
import { auth } from '@/routes/middlewares/auth'

export async function createLojaController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['Loja'],
          summary: 'Create new loja',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            indentificao: z.string(),
            address: z.string(),
            provinciaId: z.number(),
            telefone: z.string(),
            telefone2: z.string().optional(),
            email: z.string().email(),
          }),
          response: {
            201: z.object({
              id: z.number(),
              name: z.string(),
              indentificao: z.string(),
              address: z.string(),
              provinciaId: z.number(),
              telefone: z.string(),
              telefone2: z.string().nullable(),
              email: z.string().email(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-loja')
        const data = request.body
        try {
          const loja = await createLojaModel(data)
          return reply.code(201).send(loja)
        } catch (error) {}
      },
    )
}
