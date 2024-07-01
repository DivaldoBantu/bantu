import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'

interface carreiras {
  id: number
  nome_carreira: string
  regime: string
  createdAt: Date
  updatedAt: Date
}

export async function listCarreiras(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['RH'],
          summary: 'Recurso humanos',
          security: [{ bearerAuth: [] }],
          // querystring: z.object({
          //   name: z.string().optional(),
          //   email: z.string().optional(),
          // }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-carreira')
        // const { name, email } = request.query
        try {
          const { data: carreiras } = await api.get<carreiras[]>('/carreira')
          return reply.code(200).send(carreiras)
        } catch (error) {
          console.log(error)
        }
      },
    )
}
