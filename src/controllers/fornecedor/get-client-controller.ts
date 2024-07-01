import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getFornecedorModel } from '@/models/fornecedor/get-fornecedor-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getClientController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:fornecedorId',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'Encontrar Fornecedor',
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
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-fornecedor')
        const { fornecedorId } = request.params

        try {
          await Prisma.fornecedor.findError(fornecedorId)
          return reply.send(await getFornecedorModel(fornecedorId))
        } catch (err) {
          const { message, details } = handlePrismaError(err, permissionData)
          res.status(400).json({ message, details })
          throw new BadRe
        }

        return reply.code(201).send(client)
      },
    )
}
