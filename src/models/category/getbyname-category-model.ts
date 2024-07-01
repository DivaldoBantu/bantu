import { prisma } from "@/lib/prisma";

export async function getByNameCategoryModel(name:string) {
    const getbyname= await prisma.category.findUnique({where:{name}})
    return getbyname
    
}