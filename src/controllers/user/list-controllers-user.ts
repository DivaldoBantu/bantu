import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listUserModel } from '@/models/user/list-user-model'
import { auth } from '@/routes/middlewares/auth'

export async function listControllersUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/list',
      {
        schema: {
          tags: ['Members'],
          summary: 'List all members',
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
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-user')
        const { name, email } = request.query

        const members = await listUserModel({ name, email })
        return reply.code(200).send(members)
      },
    )
}
