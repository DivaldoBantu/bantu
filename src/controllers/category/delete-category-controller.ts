import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteCategoryModel } from '@/models/category/delete-category-model'
import { findByIdCategoryModel } from '@/models/category/findById-category-model'
import { auth } from '@/routes/middlewares/auth'

export async function deleteCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
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
          response: {
            200: z.string(),
          },
        },
      },
      async (request, reply) => {
        try {
          await request.verifyPermission('delete-category')
          const { id } = request.params
          const findById = await findByIdCategoryModel(id)
          if (!findById) {
            throw new Error('id not found')
          }
          await deleteCategoryModel(id)
          return reply.status(200).send('User deletado.')
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
