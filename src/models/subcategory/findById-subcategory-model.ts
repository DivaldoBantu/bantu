import { prisma } from '@/lib/prisma'

export async function findByIdSubCategoryModel(id: number) {
  const subcategory = await prisma.subCategory.findUnique({ where: { id } })
  return subcategory
}
