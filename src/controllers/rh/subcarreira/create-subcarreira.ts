import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function createSubCarreira(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['RH', 'Subcarreira'],
          summary: 'Criar subcarreira',
          security: [{ bearerAuth: [] }],
          body: z.object({
            nome_SubCarreira: z
              .string()
              .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" })
              .nonempty({ message: "O nome não pode ser enviado vazio!" }),
            Id_carreira: z
              .number()
              .int()
              .positive({ message: "O número precisa ser positivo" }),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-subcarreira')
        const body = request.body

        try {
          const { data } = await api.post('/subcarreira', body)
          return reply.code(201).send(data)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
