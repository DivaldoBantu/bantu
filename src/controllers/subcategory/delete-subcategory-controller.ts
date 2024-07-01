import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteSubCategoryModel } from '@/models/subcategory/delete-subcategory-model'
import { findByIdSubCategoryModel } from '@/models/subcategory/findById-subcategory-model'
import { auth } from '@/routes/middlewares/auth'

export async function deleteSubCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
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
          response: { 200: z.string() },
        },
      },
      async (request, reply) => {
        try {
          await request.verifyPermission('delete-subcategory')
          const { id } = request.params
          const findById = await findByIdSubCategoryModel(id)
          if (!findById) {
            throw new Error('id not found')
          }
          await deleteSubCategoryModel(id)
          return reply.status(200).send('User deletado.')
        } catch (error: any) {
          return reply.status(400).send(error.message)
        }
      },
    )
}
