import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { findByIdCategoryModel } from '@/models/category/findById-category-model'
import { updateCategoryModel } from '@/models/category/update-category-model'
import { auth } from '@/routes/middlewares/auth'

export async function updateCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/update/:id',
      {
        schema: {
          tags: ['Categoria'],
          params: z.object({
            id: z.string().transform((value, ctx) => {
              const parseId = parseInt(value)
              if (isNaN(parseId)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Not a number',
                })
                return z.NEVER
              }
              return parseId
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
        try {
          await request.verifyPermission('update-category')
          const { id } = request.params
          const { name } = request.body
          const findById = await findByIdCategoryModel(id)
          if (!findById) throw new Error('id not found')
          const update = await updateCategoryModel(id, name)
          return reply.status(200).send(update)
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
