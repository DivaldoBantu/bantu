import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { getLojaModel } from '@/models/loja/get-loja-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getLojaController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:clientId',
      {
        schema: {
          tags: ['Loja'],
          summary: 'Pesquisar',
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
          response: {
            201: z.object({
              id: z.number(),
              name: z.string(),
              indentificao: z.string(),
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
        const { lojaId } = request.params
        await request.verifyPermission('read-loja')

        await Prisma.loja.findError(lojaId)
        const loja = await getLojaModel(lojaId)
        if (!loja) throw new BadRequestError('Loja ñ encontrada')
        return reply.status(204).send(loja)
      },
    )
}
