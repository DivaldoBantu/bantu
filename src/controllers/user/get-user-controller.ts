import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { getUserModel } from '@/models/user/get-user-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

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

        try {
          const users = await getUserModel(clientId)
          return reply.status(200).send(users)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
        // return reply.send({ permissions, roles, user })
      },
    )
}
