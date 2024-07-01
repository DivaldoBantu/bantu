import { Prisma } from '@prisma/client'

export interface ErrorDetails {
  fields?: string[]
  value?: Record<string, unknown>
  constraint?: string
  code?: string
  meta?: Record<string, unknown>
}

// Função para extrair valores de meta
export function extractValuesFromMeta(
  data: Record<string, unknown>,
  fields: string[],
): Record<string, unknown> {
  return fields.reduce(
    (acc, field) => {
      acc[field] = data[field]
      return acc
    },
    {} as Record<string, unknown>,
  )
}

export function handlePrismaError(
  err: unknown,
  data: Record<string, unknown>,
): { message: string; details: ErrorDetails } {
  let message = 'Erro no servidor.'
  let details: ErrorDetails = {}

  // Verifica se err é uma instância de PrismaClientKnownRequestError
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const errorMeta = err.meta as Record<string, unknown> | undefined

    switch (err.code) {
      case 'P2002':
        // Erro de violação de campo único
        message = 'Este valor já existe e deve ser único.'
        details = {
          fields: errorMeta?.target as string[] | undefined,
          value: extractValuesFromMeta(
            data,
            (errorMeta?.target as string[]) || [],
          ),
        }
        break
      case 'P2003':
        // Erro de falta de referência
        message = 'Chave estrangeira inválida ou não encontrada.'
        details = {
          fields: [errorMeta?.field_name as string],
          value: extractValuesFromMeta(data, [errorMeta?.field_name as string]),
        }
        break
      case 'P2004':
        // Erro de violação de constraint
        message = 'Violação de restrição no banco de dados.'
        details = {
          constraint: errorMeta?.constraint as string | undefined,
        }
        break
      default:
        // Para outros códigos de erro conhecidos
        message = 'Erro desconhecido no servidor.'
        details = {
          code: err.code,
          meta: errorMeta,
        }
    }
  }

  return { message, details }
}
