import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listPermissions } from '@/models/permission/list-permissions'
import { auth } from '@/routes/middlewares/auth'

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
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-permissions')

        const permissions = await listPermissions()

        return reply.send({ permissions })
      },
    )
}
