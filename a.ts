import { prisma } from '@/lib/prisma'

const client = await prisma.cliente.findMany({
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

console.log(client)
