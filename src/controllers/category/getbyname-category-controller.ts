import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getByNameCategoryModel } from '@/models/category/getbyname-category-model'
import { auth } from '@/routes/middlewares/auth'

export async function getByNameCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:name',
      {
        schema: {
          tags: ['Categoria'],
          params: z.object({
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
        try {
          await request.verifyPermission('read-category')
          const { name } = request.params
          const category = await getByNameCategoryModel(name)
          if (!category) throw new Error('category not exists.')
          return reply.status(200).send(category)
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
