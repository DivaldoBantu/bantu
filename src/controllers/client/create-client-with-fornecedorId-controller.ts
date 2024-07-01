import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createClient } from '@/models/client/create-client-model'
import { auth } from '@/routes/middlewares/auth'
import { getErrorMessage } from '@/utils/get-error-message'
import { Prisma } from '@/utils/prisma-throws'

export async function createClienteWithFornecedorController(
  app: FastifyInstance,
) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      'with-fornecedor',
      {
        schema: {
          tags: ['cliente'],
          summary: 'criar cliente a partir de uma entidade já cadastrada',
          security: [{ bearerAuth: [] }],
          body: z.object({
            countryId: z.number(),
            telefone: z.string(),
            telefone2: z.string().optional(),
            whatsapp: z.string().optional(),
            endereco: z.string().optional(),
            email: z.string().email().optional(),
            subAccountId: z.number(),
            entidadeId: z.number(),
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
        const { entidadeId, ...rest } = request.body
        await Prisma.entidade.findError(entidadeId)
        try {
          const cliente = await createClient({
            entidadeId,
            client: { ...rest },
          })
          return reply.send(cliente)
        } catch (error) {
          return reply.send(getErrorMessage(error))
        }
      },
    )
}
