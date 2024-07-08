import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { getError } from '@/utils/error-utils'

export async function listCountriesControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/countries',
    {
      schema: {
        tags: ['Helpers'],
        summary: 'Pegara todos os Países',
        response: {
          200: z.object({
            countries: z
              .object({
                id: z.number(),
                name: z.string(),
                code: z.string(),
                provincias: z
                  .object({
                    id: z.number(),
                    name: z.string(),
                  })
                  .array(),
              })
              .array(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const countries = await prisma.country.findMany({
          include: {
            provincias: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        })
        return reply.send({ countries })
      } catch (error) {
        const { message } = getError(error)
        throw new BadRequestError(message)
      }
    },
  )
}
