import { prisma } from "@/lib/prisma";

export async function updateCategoryModel(id:number,name:string) {
    const update = await prisma.category.update({where:{id},data:{name}})
    
    return update
}