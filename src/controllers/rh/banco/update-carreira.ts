import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function updateBanco(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      ':id',
      {
        schema: {
          tags: ['RH', 'Banco'],
          summary: 'Atualizar informações de um banco',
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
          body: z.object({
            nome_banco: z.string().min(3, {
              message: 'O nome precisa ter no mínimo 3 caracteres',
            }),
            codigo: z.string().min(3, {
              message: 'O nome precisa ter no mínimo 1 caractere',
            }),
            sigla: z.string().min(2, {
              message: 'A sigla precisa ter no mínimo 2 caracteres',
            }),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-banco')
        const body = request.body
        const { id } = request.params

        try {
          const { data } = await api.put(`/banco/${id}`, body)
          return reply.code(201).send(data)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
