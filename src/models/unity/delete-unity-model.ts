import { prisma } from '@/lib/prisma'

export async function deleteUnityModel(id: number) {
  const del = await prisma.unidade.delete({ where: { id } })

  return del
}
