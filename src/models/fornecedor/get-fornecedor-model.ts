import { prisma } from '@/lib/prisma'

export async function getFornecedorModel(id: number) {
  return await prisma.fornecedor.findFirst({
    where: {
      id,
    },
  })
}
