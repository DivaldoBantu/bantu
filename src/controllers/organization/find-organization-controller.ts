import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'

export async function findOrganizationController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/',
      {
        schema: {
          tags: ['Organização'],
          summary: 'Pesquisar organização',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-empresa')

        const organization = await prisma.organization.findFirst()

        if (!organization)
          throw new BadRequestError('Organização não encontrada')

        return reply.code(201).send(organization)
      },
    )
}
