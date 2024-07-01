import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { updateArmazemModel } from '@/models/armazem/update-armazem-model'
import { auth } from '@/routes/middlewares/auth'
import { getErrorMessage } from '@/utils/get-error-message'
import { Prisma } from '@/utils/prisma-throws'

export async function updateArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/armazemId',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'Actualizar Armazem',
          security: [{ bearerAuth: [] }],
          params: z.object({
            armazemId: z.string().transform((val, ctx) => {
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
            lojaId: z.number(),
            description: z.string().optional(),
            localidade: z.string().optional(),
            bloqueioEntrada: z.boolean(),
            bloqueioSaida: z.boolean(),
          }),
          response: {
            201: z.object({
              id: z.number(),
              name: z.string(),
              lojaId: z.number(),
              description: z.string().nullable(),
              localidade: z.string().nullable(),
              bloqueioEntrada: z.boolean(),
              bloqueioSaida: z.boolean(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-armazem')
        const { armazemId } = request.params
        await Prisma.armazem.findError(armazemId)
        const data = request.body
        try {
          const armazem = await updateArmazemModel({ data, id: armazemId })
          return reply.code(201).send(armazem)
        } catch (error) {
          throw new BadRequestError(getErrorMessage(error))
        }
      },
    )
}
