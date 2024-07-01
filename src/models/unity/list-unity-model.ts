import { prisma } from '@/lib/prisma'

export async function listUnityModel() {
  const listUnity = await prisma.unidade.findMany()
  return listUnity
}
