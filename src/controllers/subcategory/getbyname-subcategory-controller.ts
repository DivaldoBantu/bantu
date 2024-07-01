import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getByNameSubCategoryModel } from '@/models/subcategory/getbyname-subcategory-model'
import { auth } from '@/routes/middlewares/auth'

export async function getByNameSubCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:name',
      {
        schema: {
          tags: ['sub-categoria'],
          params: z.object({
            name: z.string(),
          }),
          response: {
            200: z.object({
              id: z.number(),
              categoryId: z.number(),
              name: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        try {
          await request.verifyPermission('read-subcategory')
          const { name } = request.params
          const subcategory = await getByNameSubCategoryModel(name)
          if (!subcategory) throw new Error('subcategory not exists.')
          return reply.status(200).send(subcategory)
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
