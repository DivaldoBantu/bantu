import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { updateFornecedorModel } from '@/models/fornecedor/update-fornecedor-model'
import { auth } from '@/routes/middlewares/auth'
import { getErrorMessage } from '@/utils/get-error-message'
import { Prisma } from '@/utils/prisma-throws'

export async function updateFornecedorController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/fornecedorId',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'Actualizar fornecedor',
          security: [{ bearerAuth: [] }],
          params: z.object({
            fornecedorId: z.string().transform((val, ctx) => {
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
            telefone2: z.string().optional().nullable(),
            whatsapp: z.string().optional().nullable(),
            endereco: z.string().optional().nullable(),
            email: z.string().email().optional().nullable(),
            subAccountId: z.number(),
            entidadeId: z.number(),
            estado: z.enum(['ACTIVO', 'REMOVIDO']),
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        const data = request.body
        await request.verifyPermission('update-fornecedor')
        const { fornecedorId } = request.params
        try {
          await Prisma.fornecedor.findError(fornecedorId)
          const fornecedor = await updateFornecedorModel({
            data,
            id: fornecedorId,
          })
          return reply.code(201).send(fornecedor)
        } catch (error) {
          throw new BadRequestError(getErrorMessage(error))
        }
      },
    )
}
