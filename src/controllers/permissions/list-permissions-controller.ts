import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { listPermissions } from '@/models/permission/list-permissions'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function listPermissionsController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Permissões'],
          summary: 'Listar todas as permissões',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              permissions: z
                .object({
                  id: z.number(),
                  slug: z.string(),
                  description: z.string().nullable(),
                  perfis: z.number(),
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-permissions')

        try {
          const permissions = await listPermissions()
          return reply.send({ permissions })
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
