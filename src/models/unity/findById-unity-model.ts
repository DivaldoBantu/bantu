import { prisma } from '@/lib/prisma'

export async function findByIdUnityModel(id: number) {
  const unity = await prisma.unidade.findUnique({ where: { id } })
  return unity
}
