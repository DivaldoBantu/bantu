import { prisma } from '@/lib/prisma'

export async function listFornecedoresModel() {
  return await prisma.cliente.findMany()
}
