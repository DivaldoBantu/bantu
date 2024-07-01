import { prisma } from "@/lib/prisma";

export async function listSubCategoryModel() {
    const list = await prisma.subCategory.findMany()
    return list
    
}