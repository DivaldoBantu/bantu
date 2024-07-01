import type { FastifyInstance } from 'fastify'

import { createSubCategoryController } from './subcategory/create-subcategory-controller'
import { deleteSubCategoryController } from './subcategory/delete-subcategory-controller'
import { getByNameSubCategoryController } from './subcategory/getbyname-subcategory-controller'
import { listSubCategoryController } from './subcategory/list-subcategory-controller'
import { updateSubCategoryController } from './subcategory/update-subcategory-controller'

export async function subcategory(app: FastifyInstance) {
  app.register(createSubCategoryController)
  app.register(deleteSubCategoryController)
  app.register(getByNameSubCategoryController)
  app.register(updateSubCategoryController)
  app.register(listSubCategoryController)
}
