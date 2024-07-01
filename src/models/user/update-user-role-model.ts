import { prisma } from '@/lib/prisma'
interface props {
  userId: number
  role: {
    id: number
    value: boolean
  }
}
export async function updateUserModel({ userId, role }: props) {
  const roleId = await prisma.role.findUnique({
    where: {
      id: role.id,
    },
  })

  if (!roleId?.id) throw new Error('Role não encontrada')

  const ifAtt = await prisma.userProfile.findFirst({
    where: {
      userId,
      roleId: roleId.id,
    },
  })

  if (role.value === true && !ifAtt) {
    await prisma.userProfile.create({
      data: {
        userId,
        roleId: roleId.id,
      },
    })
    return
  } else {
    await prisma.userProfile.deleteMany({
      where: {
        userId,
        roleId: roleId.id,
      },
    })
  }

  const ab = await prisma.userProfile.findFirst({
    where: {
      userId,
      roleId: roleId.id,
    },
  })
  const result = !!ab

  return result
}
