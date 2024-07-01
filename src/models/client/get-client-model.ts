import { prisma } from '@/lib/prisma'
import type { cliente } from '@/types/global'

export async function getClientModel(userId: number) {
  const client = await prisma.cliente.findFirst({
    where: {
      id: userId,
    },
  })

  return client as cliente
}
