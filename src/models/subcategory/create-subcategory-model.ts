import { prisma } from "@/lib/prisma";

 export async function createSubCategoryModel(name:string,idCategory:number) {
    const subcategory= await prisma.subCategory.create({data:{
        name,
        categoryId:idCategory
    }})
    return subcategory
}