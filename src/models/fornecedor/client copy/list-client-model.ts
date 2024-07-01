import { prisma } from '@/lib/prisma'

export async function listClientModel() {
  return await prisma.cliente.findMany()
}
