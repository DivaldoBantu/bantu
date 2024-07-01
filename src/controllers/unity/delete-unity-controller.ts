import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteUnityModel } from '@/models/unity/delete-unity-model'
import { findByIdUnityModel } from '@/models/unity/findById-unity-model'
import { auth } from '@/routes/middlewares/auth'

export async function deleteUnityController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['unidade'],
          security: [{ bearerAuth: [] }],
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
          response: {
            200: z.string(),
          },
        },
      },

      async (request, reply) => {
        const { id } = request.params
        const findId = await findByIdUnityModel(id)
        if (!findId) throw new Error('id not found')
        const del = await deleteUnityModel(id)
        if (!del) throw new Error('user no delete')
        reply.status(200).send('Usuário deletado')
      },
    )
}
