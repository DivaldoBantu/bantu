import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { findByIdSubCategoryModel } from '@/models/subcategory/findById-subcategory-model'
import { updateSubCategoryModel } from '@/models/subcategory/update-subcategory-model'
import { auth } from '@/routes/middlewares/auth'

export async function updateSubCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/update/:id',
      {
        schema: {
          tags: ['sub-categoria'],
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
              categoryId: z.number(),
              name: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        try {
          await request.verifyPermission('update-subcategory')
          const { id } = request.params
          const { name } = request.body
          const findById = await findByIdSubCategoryModel(id)
          if (!findById) {
            throw new Error('id not found')
          }
          const update = await updateSubCategoryModel(id, name)
          return reply.status(200).send(update)
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
