import { prisma } from '@/lib/prisma'

export async function getAllPermissionsModel() {
  const permissions = await prisma.permission.findMany()

  return permissions
}
