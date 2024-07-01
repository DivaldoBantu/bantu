import { prisma } from '@/lib/prisma'

export async function deleteUserModel(id: number) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  })
  return user
}
