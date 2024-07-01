import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getUserModel } from '@/models/user/get-user-model'
import { auth } from '@/routes/middlewares/auth'

export async function getControllersUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:clientId',
      {
        schema: {
          tags: ['Members'],
          summary: 'Get member by Id',
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
          response: {
            200: z.object({
              roles: z.any(),
              user: z.any(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-user')
        const { clientId } = request.params
        const users = await getUserModel(clientId)
        const { roles, user } = users
        return reply.status(200).send({ user, roles })
        // return reply.send({ permissions, roles, user })
      },
    )
}
