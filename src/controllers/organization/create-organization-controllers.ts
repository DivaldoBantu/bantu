import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'

export async function createOrganizationController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['Organização'],
          summary: 'criar organização',
          security: [{ bearerAuth: [] }],
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
            indicadorFactura: z.string(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-empresa')
        const { countryId, provinciaId, ...data } = request.body

        const country = await prisma.country.findUnique({
          where: {
            id: countryId,
            provincias: {
              some: {
                id: provinciaId,
              },
            },
          },
          select: {
            id: true,
            provincias: {
              select: {
                id: true,
              },
            },
          },
        })

        if (!country)
          throw new BadRequestError('País ou província não encontrada')

        const organization = await prisma.organization.create({
          data: {
            countryId: country.id,
            provinciaId: country.provincias[0].id,
            ...data,
          },
        })

        return reply.code(201).send(organization)
      },
    )
}
