import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function createCategoria(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['RH', 'RH-Categoria'],
          summary: 'Criar categoria',
          security: [{ bearerAuth: [] }],
          body: z.object({
            nome_categoria: z.string(),
            salario_base: z.number(),
            Id_carreira: z.number().optional(),
            Id_subCarreira: z.number().optional(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-categoria')
        const body = request.body

        try {
          const { data } = await api.post('/categoria', body)
          return reply.code(201).send(data)
        } catch (error) {
          console.log(error)
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
