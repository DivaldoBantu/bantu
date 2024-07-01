import { prisma } from "@/lib/prisma";

export async function getByNameSubCategoryModel(name:string) {
    const getbyname= await prisma.subCategory.findUnique({where:{name}})
    return getbyname
    
}