import { prisma } from "@/lib/prisma";

export async function listSubCategoryModel() {
    const list = await prisma.subCategory.findMany({include:{
        category: {
            select: {
                name:true
            }
        }
    }})

    const [firstItem] = list;
    const { id, categoryId, name, category: { name: categoryName } } = firstItem;
  
    return[ {id,name,categoryName}]
    
}