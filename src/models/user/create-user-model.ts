import { prisma } from '@/lib/prisma'

interface props {
  name: string
  email: string
  isSuperAdmin: boolean
  password: string
}

export async function createUserModel(data: props) {
  const user = await prisma.user.create({
    data,
  })
  return user
}
