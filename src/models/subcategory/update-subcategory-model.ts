import { prisma } from "@/lib/prisma";

export async function updateSubCategoryModel(id:number,name:string) {
    const update = await prisma.subCategory.update({where:{id},data:{name}})
    
    return update
}