import { prisma } from '@/lib/prisma'

export async function getUserProfileModel(id: number) {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
    },
    where: {
      id,
    },
  })

  return user
}
