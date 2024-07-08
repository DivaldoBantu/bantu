import { prisma } from '@/lib/prisma'
import type { fornecedor } from '@/types/global'

interface props {
  data: fornecedor
  id: number
}

export async function updateFornecedorModel({ data, id }: props) {
  return await prisma.fornecedor.update({
    data,
    where: {
      id,
    },
  })
}
