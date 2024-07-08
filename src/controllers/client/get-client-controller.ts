import { Estado, TipoDesconto, TipoIdentificacao } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { getClientModel } from '@/models/client/get-client-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'

export async function getClientController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:clientId',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'Encontrar cliente',
          security: [{ bearerAuth: [] }],
          params: z.object({
            clientId: z.string().transform((val, ctx) => {
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
            200: z.object({
              id: z.number(),
              entidadeId: z.number(),
              tipoDesconto: z.nativeEnum(TipoDesconto),
              saldo: z.number(),
              estado: z.nativeEnum(Estado),
              country: z.object({
                code: z.string(),
                name: z.string(),
              }),
              entidade: z.object({
                name: z.string(),
                identificacao: z.string(),
                tipodeIdentificacao: z.nativeEnum(TipoIdentificacao),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-cliente')
        const { clientId } = request.params

        try {
          await Prisma.client.findError(clientId)
          const client = await getClientModel(clientId)
          return reply.code(200).send(client)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
