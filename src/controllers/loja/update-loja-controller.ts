import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { updateLojaModel } from '@/models/loja/update-loja-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'

export async function updateLojaController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/lojaId',
      {
        schema: {
          tags: ['Loja'],
          summary: 'Actualizar loja',
          security: [{ bearerAuth: [] }],
          params: z.object({
            lojaId: z.string().transform((val, ctx) => {
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
            name: z.string(),
            identificacao: z.string(),
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
              identificacao: z.string(),
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
        await request.verifyPermission('update-loja')
        const { lojaId } = request.params
        const data = request.body
        try {
          await Prisma.loja.findError(lojaId)
          const loja = await updateLojaModel({ data, id: lojaId })
          return reply.code(201).send(loja)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
