import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { getUserProfileModel } from '@/models/user/get-user-profile-model'
import { auth } from '@/routes/middlewares/auth'
export async function getProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/profile',
      {
        schema: {
          tags: ['Settings'],
          summary: 'Get authenticated user profile',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              user: z.object({
                id: z.number(),
                name: z.string(),
                email: z.string().email(),
                avatar: z.string().nullable(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const user = await getUserProfileModel(userId)
        console.log(user)
        if (!user) throw new BadRequestError('usuário não encontrado.')

        return reply.send({ user })
      },
    )
}
