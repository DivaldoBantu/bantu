import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { getErrorMessage } from '@/utils/get-error-message'

export async function deleteFornecedorModel(id: number) {
  try {
    return await prisma.fornecedor.delete({
      where: {
        id,
      },
    })
  }catch(err){
    throw new BadRequestError(getErrorMessage(err))
  }
}
