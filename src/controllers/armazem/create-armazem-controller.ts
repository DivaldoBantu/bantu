import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { createArmazemModel } from '@/models/armazem/create-armazem-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'

export async function createArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'criar armazem',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            lojaId: z.string().transform((value, ctx) => {
              const parseId = parseInt(value)
              if (isNaN(parseId)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Not a number',
                })
                return z.NEVER
              }
              return parseId
            }),
            description: z.string().optional(),
            localidade: z.string().optional(),
            bloqueioEntrada: z.boolean(),
            bloqueioSaida: z.boolean(),
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-armazem')
        const data = request.body
        try {
          await Prisma.loja.findError(data.lojaId)
          const armazem = await createArmazemModel(data)
          return reply.code(204).send(armazem)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
