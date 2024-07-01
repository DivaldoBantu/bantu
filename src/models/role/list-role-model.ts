import { prisma } from '@/lib/prisma'

export async function listRoleModel(name: string | undefined) {
  const roles = await prisma.role.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
    where: {
      name: {
        contains: name,
      },
    },
    orderBy: {
      id: 'asc',
    },
  })

  return roles
}
