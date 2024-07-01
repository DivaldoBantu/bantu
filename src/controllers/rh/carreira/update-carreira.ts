import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import type { carreira } from '@/types/global'

export async function updateCarreira(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      ':carreiraId',
      {
        schema: {
          tags: ['RH'],
          summary: 'Atualizar informações da categoria',
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
          body: z.object({
            nome_carreira: z
              .string()
              .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
            regime: z.enum(['geral', 'especial'], {
              message: 'O Regime somente deve ser geral ou especial!',
            }),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-carreira')
        const body = request.body
        const { carreiraId } = request.params

        try {
          const { data } = await api.put<carreira>(
            `/carreira/${carreiraId}`,
            body,
          )
          return reply.code(201).send(data)
        } catch (error) {
          console.log(error)
          return reply.code(400).send({ message: 'Erro ao criar carreira' })
        }
      },
    )
}
