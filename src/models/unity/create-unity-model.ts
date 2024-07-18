import { prisma } from '@/lib/prisma'

interface props {
 
  name: string
}

export async function createUnityModels({ name }: props) {
  const data = await prisma.unidade.create({
    data: {
      name
    },
  })
  return data
}
