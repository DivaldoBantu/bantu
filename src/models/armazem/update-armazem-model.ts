import { prisma } from '@/lib/prisma'
import type { Armazem } from '@/types/global'

interface props {
  data: Armazem
  id: number
}

export async function updateArmazemModel({ data, id }: props) {
  return await prisma.armazem.update({
    data,
    where: {
      id,
    },
  })
}
