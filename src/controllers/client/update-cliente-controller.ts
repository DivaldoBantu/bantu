import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { auth } from '@/routes/middlewares/auth'
import { getErrorMessage } from '@/utils/get-error-message'
import { Prisma } from '@/utils/prisma-throws'

import { updateClientModel } from '../../models/client/update-client-model'

export async function updateClienteController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/clientId',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'Actualizar loja',
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
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-cliente')
        const { clientId } = request.params
        await Prisma.client.findError(clientId)
        const data = request.body
        try {
          const loja = await updateClientModel({ data, id: clientId })
          return reply.code(201).send(loja)
        } catch (error) {
          throw new BadRequestError(getErrorMessage(error))
        }
      },
    )
}
