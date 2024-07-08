import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { listUserModel } from '@/models/user/list-user-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function listControllersUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Members'],
          summary: 'Listar members',
          security: [{ bearerAuth: [] }],
          querystring: z.object({
            name: z.string().optional(),
            email: z.string().optional(),
          }),
          response: {
            200: z.object({
              members: z
                .object({
                  id: z.number(),
                  name: z.string(),
                  email: z.string(),
                  avatar: z.string().nullable(),
                  status: z.boolean(),
                  createdAt: z.date(),
                  profiles: z.number(),
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-user')
        const { name, email } = request.query

        try {
          const members = await listUserModel({ name, email })
          return reply.code(200).send(members)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
