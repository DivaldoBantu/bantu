import type { FastifyInstance } from 'fastify'

import { createOrganizationController } from './organization/create-organization-controllers'
import { findOrganizationController } from './organization/find-organization-controller'
import { updateOrganizationController } from './organization/update-organization'

export async function organization(app: FastifyInstance) {
  app.register(createOrganizationController)
  app.register(updateOrganizationController)
  app.register(findOrganizationController)
}
