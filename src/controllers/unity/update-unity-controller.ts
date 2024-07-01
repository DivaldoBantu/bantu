import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { findByIdUnityModel } from '@/models/unity/findById-unity-model'
import { updateUnityModel } from '@/models/unity/upadate-unity-model'
import { auth } from '@/routes/middlewares/auth'

export async function updateUnityController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/update',
      {
        schema: {
          tags: ['unidade'],
          params: z.object({
            id: z.string().transform((val, ctx) => {
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
            name: z.string(),
          }),
          response: {
            200: z.object({
              id: z.number(),
              name: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { name } = request.body
        const { id } = request.params
        const findId = await findByIdUnityModel(id)
        if (!findId) throw new Error('id not found')
        const update = await updateUnityModel({ id, name })
        return reply.status(200).send(update)
      },
    )
}
