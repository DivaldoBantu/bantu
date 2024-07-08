import { prisma } from '@/lib/prisma'
interface props {
  name: string | undefined
  email: string | undefined
}
export async function listUserModel({ name, email }: props) {
  const res = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      active: true,
      createdAt: true,
      profiles: {
        select: {
          role: {
            select: {
              _count: true,
            },
          },
        },
      },
    },
    where: {
      name: {
        contains: name,
      },
      email: {
        contains: email,
      },
    },
  })
  const members = res.map((e) => {
    return {
      id: e.id,
      name: e.name,
      email: e.email,
      avatar: e.avatar,
      status: e.active,
      createdAt: e.createdAt,
      profiles: e.profiles
        .map((b) => b.role._count.usersProfiles)
        .reduce((acc, e) => e + acc, 0),
    }
  })

  return { members }
}
