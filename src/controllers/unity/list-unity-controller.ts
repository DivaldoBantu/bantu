import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listUnityModel } from '@/models/unity/list-unity-model'
import { auth } from '@/routes/middlewares/auth'

export async function listUnityController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/list',
      {
        schema: {
          tags: ['unidade'],
          security: [{ bearerAuth: [] }],
          response: {
            200: z
              .object({
                id: z.number(),
                name: z.string(),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        const list = await listUnityModel()
        if (!list) throw new Error('not exits')
        return reply.status(200).send(list)
      },
    )
}
