import { prisma } from '@/lib/prisma'

export async function listClientModel() {
  return await prisma.cliente.findMany({
    select: {
      id: true,
      entidadeId: true,
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
      tipoDesconto: true,
      saldo: true,
      estado: true,
    },
  })
}
