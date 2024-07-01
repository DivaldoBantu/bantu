import { prisma } from '@/lib/prisma'

export async function findByIdCategoryModel(id: number) {
  const category = await prisma.category.findUnique({ where: { id } })
  return category
}
