import { prisma } from '@/lib/prisma'

export async function listFornecedoresModel() {
  return await prisma.fornecedor.findMany({
    select: {
      id: true,
      entidadeId: true,
      email: true,
      country: {
        select: {
          name: true,
          code: true,
        },
      },
      entidade: {
        select: {
          name: true,
          identificacao: true,
          tipodeIdentificacao: true,
        },
      },
      estado: true,
    },
  })
}
