import { prisma } from '@/lib/prisma'
import type { Loja } from '@/types/global'

export async function createLojaModel(data: Loja) {
  return await prisma.loja.create({
    data,
  })
}
