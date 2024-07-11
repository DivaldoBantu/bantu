import { TipoIdentificacao } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { listFornecedoresModel } from '@/models/fornecedor/list-fornecedores-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function listFornecedoresController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'listas fornecedores',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              fornecedores: z
                .object({
                  id: z.number(),
                  entidadeId: z.number(),
                  email: z.string().nullable(),
                  estado: z.enum(['ACTIVO', 'REMOVIDO']),
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
        await request.verifyPermission('list-fornecedor')
        try {
          const fornecedores = await listFornecedoresModel()
          return reply.code(200).send({ fornecedores })
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
