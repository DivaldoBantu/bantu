import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function deleteCompetencia(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['RH', 'Competencia'],
          summary: 'Deletar competencia pelo id',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().transform((val, ctx) => {
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
        await request.verifyPermission('delete-competencia')
        const { id } = request.params
        try {
          await api.delete(`/competencia/${id}`)
          return reply.code(200).send('competencia deletada com sucesso')
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
