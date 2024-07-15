import type { FastifyInstance } from 'fastify'

import { deleteFuncionario } from './rh/funcionario/delete-funcionario'
import { getFuncionario } from './rh/funcionario/get-funcionario'
import { listFuncionario } from './rh/funcionario/list-funcionario'
import { createFuncionario } from './rh/funcionario/create-funcionario'


export async function funcionario(app: FastifyInstance) {
  app.register(deleteFuncionario)
  app.register(getFuncionario)
  app.register(listFuncionario)
  app.register(createFuncionario)
}
