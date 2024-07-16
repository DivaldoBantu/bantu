import { prisma } from '@/lib/prisma'
import { Prisma } from '@/utils/prisma-throws'
interface props {
  userId: number
  role: {
    id: number
    value: boolean
  }
}
export async function updateUserModel({ userId, role }: props) {
  await Prisma.role.findError(role.id)

  if (role.value === true) {
    await prisma.userProfile.upsert({
      where: {
        roleId_userId: {
          userId,
          roleId: role.id,
        },
      },
      update: {}, // Não é necessário fazer nada, a permissão já existe
      create: {
        userId,
        roleId: role.id,
      },
    })
  } else {
    // Remove a permissão
    await prisma.userProfile.deleteMany({
      where: {
        userId,
        roleId: role.id,
      },
    })
  }
  return 'Role do usuário atualizada com sucesso!'
}
