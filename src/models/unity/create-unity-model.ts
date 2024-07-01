import { prisma } from '@/lib/prisma'

interface props {
  id: number
  name: string
}

export async function createUnityModels({ id, name }: props) {
  const data = await prisma.unidade.create({
    data: {
      id,
      name,
    },
  })
  return data
}
