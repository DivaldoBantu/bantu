import { prisma } from "@/lib/prisma";

export async function deleteCategoryModel(id:number) {
    const del= await prisma.category.delete({where:{id}})
    return del
    
}