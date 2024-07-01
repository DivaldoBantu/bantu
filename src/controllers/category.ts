import type { FastifyInstance } from 'fastify'

import { createCategoryController } from './category/create-category-controller'
import { deleteCategoryController } from './category/delete-category-controller'
import { getByNameCategoryController } from './category/getbyname-category-controller'
import { listCategoryController } from './category/list-category-controller'
import { updateCategoryController } from './category/update-category-controller'

export async function category(app: FastifyInstance) {
  app.register(createCategoryController)
  app.register(deleteCategoryController)
  app.register(getByNameCategoryController)
  app.register(updateCategoryController)
   app.register(listCategoryController)
}
