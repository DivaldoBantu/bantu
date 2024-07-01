import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import type { carreira } from '@/types/global'

export async function getCarreira(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:carreiraId',
      {
        schema: {
          tags: ['RH'],
          summary: 'Buscar carreira pelo id',
          security: [{ bearerAuth: [] }],
          params: z.object({
            carreiraId: z.string().transform((val, ctx) => {
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
        const { carreiraId } = request.params
        await request.verifyPermission('read-carreira')
        try {
          const { data: carreiras } = await api.get<carreira>(
            `/carreira/${carreiraId}`,
          )
          return reply.code(200).send(carreiras)
        } catch (error) {
          console.log(error)
        }
      },
    )
}
