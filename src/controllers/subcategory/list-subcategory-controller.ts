import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listSubCategoryModel } from '@/models/subcategory/list-subcategory-model'
import { auth } from '@/routes/middlewares/auth'

export async function listSubCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/list',
      {
        schema: {
        tags: ['sub-categoria'],
          response: {
            200: z
              .object({
                id: z.number(),
                categoryId: z.number(),
                name: z.string(),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        try {
          await request.verifyPermission('list-subcategory')
          const list = await listSubCategoryModel()
          return reply.status(200).send(list)
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
