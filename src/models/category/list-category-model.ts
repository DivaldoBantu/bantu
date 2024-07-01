import { prisma } from "@/lib/prisma";

export async function listCategoryModel() {
    const list = await prisma.category.findMany()
    return list
    
}