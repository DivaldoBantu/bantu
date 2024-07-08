import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateOrganizationController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:organizationId',
      {
        schema: {
          tags: ['Organization'],
          summary: 'Actualizar organização',
          security: [{ bearerAuth: [] }],
          params: z.object({
            organizationId: z.string().transform((val, ctx) => {
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
            codigo: z.string(),
            name: z.string(),
            type: z.enum(['SEDE', 'FILIAL']),
            avatar: z.string().optional(),
            countryId: z.number(),
            provinciaId: z.number(),
            endereco: z.string().optional(),
            cidade: z.string().optional(),
            telefone: z.string(),
            telefone1: z.string().optional(),
            email: z.string().email().optional(),
            nif: z.string(),
            cae: z.string().optional(),
            alvara: z.string().optional(),
            regimeIva: z.enum(['NAO_SUJEITO', 'SIMPLIFICADO', 'GERAL']),
            indicadorFatura: z.string(),
          }),
          response: {
            204: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-empresa')
        const { organizationId } = request.params
        const data = request.body

        await Prisma.organization.findError(organizationId)
        const result = await prisma.organization.update({
          where: {
            id: organizationId,
          },
          data,
        })

        return reply.status(204).send(result)
      },
    )
}
