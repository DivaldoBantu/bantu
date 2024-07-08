import type { FastifyInstance } from 'fastify'

import { listCountriesControllers } from './helpers/countries-controller'

export async function helpers(app: FastifyInstance) {
  app.register(listCountriesControllers)
}
