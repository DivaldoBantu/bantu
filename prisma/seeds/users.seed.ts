import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'

export async function seedUsers() {
  const first = await prisma.user.findFirst({
    where: {
      email: 'john@acme.com',
    },
  })
  if (first) {
    console.log('super user already seeded')
    return
  }

  const roleId = await prisma.role.findFirst({
    where: { name: 'teste' },
    select: {
      id: true,
    },
  })

  if (!roleId) throw new Error('Role não encontrada')
  const password = await bcrypt.hash('123456', 6)

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@acme.com',
      password,
      isSuperAdmin:true
    },
  })

  await prisma.userProfile.create({
    data: {
      userId: user.id,
      roleId: roleId.id,
    },
  })
  console.log('Users seeded')
}
