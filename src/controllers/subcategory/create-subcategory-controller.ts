import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createSubCategoryModel } from '@/models/subcategory/create-subcategory-model'
import { getByNameSubCategoryModel } from '@/models/subcategory/getbyname-subcategory-model'
import { auth } from '@/routes/middlewares/auth'

export async function createSubCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/create',
      {
        schema: {
          tags: ['sub-categoria'],
          body: z.object({
            categoryId: z.number(),
            name: z.string(),
          }),
          response: {
            200: z.object({
              name: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        try {
          await request.verifyPermission('create-subcategory')
          const { name, categoryId } = request.body
          const findByName = await getByNameSubCategoryModel(name)
          if (findByName) {
            throw new Error('SubCategory exists.')
          }
          const subcategory = await createSubCategoryModel(name, categoryId)
          return reply.status(200).send({ name: subcategory.name })
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
