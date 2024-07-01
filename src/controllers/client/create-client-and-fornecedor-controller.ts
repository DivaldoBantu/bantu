import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createClientAndEntidadeModel } from '@/models/client/create-client-model'
import { auth } from '@/routes/middlewares/auth'
import { getErrorMessage } from '@/utils/get-error-message'

export async function createClienteAndFornecedorController(
  app: FastifyInstance,
) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      'and-fornecedor',
      {
        schema: {
          tags: ['cliente'],
          summary: 'criar cliente a e uma entidade',
          security: [{ bearerAuth: [] }],
          body: z.object({
            countryId: z.number(),
            telefone: z.string(),
            telefone2: z.string().optional(),
            whatsapp: z.string().optional(),
            endereco: z.string().optional(),
            email: z.string().email().optional(),
            subAccountId: z.number(),
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
            tipoDesconto: z.enum([
              'COMERCIAL',
              'FINANCEIRO',
              'DIVERSO',
              'NENHUM',
            ]),
            valorDesconto: z.number().optional(),
            percentagemDesconto: z.number().optional(),
            efectuaRetencao: z.boolean(),
            saldo: z.number(),
            limiteSaldo: z.number(),
            limiteCredito: z.number(),
            estado: z.enum(['ACTIVO', 'REMOVIDO']),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-cliente')
        const { entidade, ...rest } = request.body
        try {
          const cliente = await createClientAndEntidadeModel({
            entidade,
            client: { ...rest },
          })
          return reply.send(cliente)
        } catch (error) {
          return reply.send(getErrorMessage(error))
        }
      },
    )
}
