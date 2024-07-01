import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'

export async function deleteCarreira(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:carreiraId',
      {
        schema: {
          tags: ['RH'],
          summary: 'Deletar carreira pelo id',
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
            204: z.any(),
          },
        },
      },
      async (request, reply) => {
        const { carreiraId } = request.params
        await request.verifyPermission('read-carreira')
        try {
          await api.delete(`/carreira/${carreiraId}`)
          return reply.code(200).send('carreira deletada com sucesso')
        } catch (error) {
          console.log(error)
        }
      },
    )
}
