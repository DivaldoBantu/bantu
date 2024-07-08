import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

export async function getClientModel(id: number) {
  const client = await prisma.cliente.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      entidadeId: true,
      entidade: {
        select: {
          name: true,
          identificacao: true,
          tipodeIdentificacao: true,
        },
      },
      country: {
        select: {
          name: true,
          code: true,
        },
      },
      tipoDesconto: true,
      saldo: true,
      estado: true,
    },
  })

  if (!client) throw new BadRequestError('cliente não encontrada')
  return client
}
