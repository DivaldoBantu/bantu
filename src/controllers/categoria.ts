import type { FastifyInstance } from 'fastify'

import { listCategorias } from './rh/categoria/list-categotia'
import { getCategotia } from './rh/categoria/get-categotia'
import { deleteCategoria } from './rh/categoria/delete-categoria'




export async function categoria(app: FastifyInstance) {
  app.register(listCategorias)
  app.register(getCategotia)
    app.register(deleteCategoria)
  
}
