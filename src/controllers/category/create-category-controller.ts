import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createCategoryModel } from '@/models/category/create-category-model'
import { getByNameCategoryModel } from '@/models/category/getbyname-category-model'
import { auth } from '@/routes/middlewares/auth'

export async function createCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/create',
      {
        schema: {
          tags: ['Categoria'],
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
        try {
          await request.verifyPermission('create-category')
          const { name } = request.body
          const findByName = await getByNameCategoryModel(name)
          if (findByName) throw new Error('Category exists.')
          const category = await createCategoryModel(name)
          return reply.status(200).send(category)
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
