import type { FastifyInstance } from 'fastify'

import { listarSubcarreira } from './rh/subcarreira/list-subcarreira'
import { deleteSubCarreira } from './rh/subcarreira/delete-subcarreira'
import { createSubCarreira } from './rh/subcarreira/create-subcarreira'
import { getSubCarreira } from './rh/subcarreira/get-subcarreira'



export async function subCarreira(app: FastifyInstance) {
  app.register(listarSubcarreira)
  app.register(deleteSubCarreira)
  app.register(createSubCarreira)
  app.register(getSubCarreira)
}
