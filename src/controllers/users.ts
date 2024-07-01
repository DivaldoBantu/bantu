import type { FastifyInstance } from 'fastify'

import { createControllersUser } from './user/create-controllers-user'
import { deleteControllersUser } from './user/delete-controllers-user'
import { getControllersUser } from './user/get-controller-user'
import { listControllersUser } from './user/list-controllers-user'
import { updateUserRoles } from './user/update-controllers-user'

export async function users(app: FastifyInstance) {
  app.register(createControllersUser)
  app.register(listControllersUser)
  app.register(deleteControllersUser)
  app.register(updateUserRoles)
  app.register(getControllersUser)
}
