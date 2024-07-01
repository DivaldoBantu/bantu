import { prisma } from "@/lib/prisma";

 export async function createCategoryModel(name:string) {
    const category= await prisma.category.create({data:{
        name
    }})
    return category
}