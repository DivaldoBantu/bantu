import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listCategoryModel } from '@/models/category/list-category-model'
import { auth } from '@/routes/middlewares/auth'
export async function listCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/list',
      {
        schema: {
          tags: ['Categoria'],
          response: {
            200: z
              .object({
                id: z.number(),
                name: z.string(),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        try {
          await request.verifyPermission('list-category')
          const list = await listCategoryModel()
          return reply.status(200).send(list)
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
