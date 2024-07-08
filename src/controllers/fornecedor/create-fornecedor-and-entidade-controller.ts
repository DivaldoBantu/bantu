import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createFornecedorAndEntidadeModel } from '@/models/fornecedor/create-fornecedor-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function createFornecedorAndEntidadeController(
  app: FastifyInstance,
) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '-and-entidade',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'criar fornecedor e entidade',
          security: [{ bearerAuth: [] }],
          body: z.object({
            entidade: z.object({
              name: z.string(),
              tipo: z.enum(['SINGULAR', 'COLECTIVO']),
              identificacao: z.string(),
              tipodeIdentificacao: z.enum([
                'BI',
                'NIF',
                'PASSAPORTE',
                'CARTAO_DE_RESIDENTE',
              ]),
            }),
            countryId: z.number(),
            telefone: z.string(),
            telefone2: z.string().optional().nullable(),
            whatsapp: z.string().optional().nullable(),
            endereco: z.string().optional().nullable(),
            email: z.string().email().optional().nullable(),
            subAccountId: z.number(),
            estado: z.enum(['ACTIVO', 'REMOVIDO']),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-fornecedor')
        const { entidade, ...rest } = request.body
        try {
          const fornecedor = await createFornecedorAndEntidadeModel({
            entidade,
            fornecedor: { ...rest },
          })
          return reply.send(fornecedor)
        } catch (error) {
          return reply.send(getError(error))
        }
      },
    )
}
