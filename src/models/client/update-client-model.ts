import { prisma } from '@/lib/prisma'
import type { cliente } from '@/types/global'

interface props {
  data: cliente
  id: number
}

export async function updateClientModel({ data, id }: props) {
  return await prisma.cliente.update({
    data,
    where: {
      id,
    },
  })
}
