import { Prisma } from '@prisma/client'

import { getErrorMessage } from './get-error-message'

export function getError(err: unknown): {
  message: string
} {
  let message = 'Erro no servidor.'

  // Verifica se err é uma instância de PrismaClientKnownRequestError
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        // Erro de violação de campo único
        message = 'Este valor já existe e deve ser único.'
        break
      case 'P2003':
        // Erro de falta de referência
        message = 'Chave estrangeira inválida ou não encontrada.'
        break
      case 'P2004':
        // Erro de violação de constraint
        message = 'Violação de restrição no banco de dados.'
        break
      default:
        message = 'Erro desconhecido no servidor.'
    }
    return { message }
  } else {
    return { message: getErrorMessage(err) }
  }
}
