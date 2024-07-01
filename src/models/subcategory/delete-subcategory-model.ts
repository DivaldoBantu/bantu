import { prisma } from "@/lib/prisma";

export async function deleteSubCategoryModel(id:number) {
    const del= await prisma.subCategory.delete({where:{id}})
    return del
    
}