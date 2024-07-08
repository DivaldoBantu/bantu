import { Estado, TipoDesconto, TipoIdentificacao } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { listClientModel } from '@/models/client/list-client-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function listClienteController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'listas clientes',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              clientes: z
                .object({
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
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-cliente')
        try {
          const clientes = await listClientModel()
          return reply.code(200).send({ clientes })
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
