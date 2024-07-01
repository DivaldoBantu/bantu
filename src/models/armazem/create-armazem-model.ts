import { prisma } from '@/lib/prisma'
import type { Armazem } from '@/types/global'

export async function createArmazemModel(params: Armazem) {
  return await prisma.armazem.create({
    data: params,
  })
}
