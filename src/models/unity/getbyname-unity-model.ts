import { prisma } from '@/lib/prisma'

export async function getByNameUnityModel(name: string) {
  const getUnity = await prisma.unidade.findUnique({ where: { name } })
  return getUnity
}
