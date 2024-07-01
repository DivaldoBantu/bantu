import { prisma } from '@/lib/prisma'
interface props {
  name: string | undefined
  email: string | undefined
}
export async function listUserModel({ name, email }: props) {
  const members = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
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

  return { members }
}
