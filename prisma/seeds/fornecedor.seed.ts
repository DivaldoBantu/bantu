import { prisma } from '@/lib/prisma'
import { Prisma } from '@/utils/prisma-throws'

export async function seedFornecedor() {
  const angolaId = await Prisma.country.findByCodeError('AO')
  const subAccount = await Prisma.subAccount.findByNumeroError('32.1')

  const entidade = await prisma.entidadeTerceiros.create({
    data: {
      name: 'Fornecedor Diferenciado',
      tipo: 'SINGULAR',
      identificacao: '999999999',
      tipodeIdentificacao: 'NIF',
    },
  })
  await prisma.fornecedor.create({
    data: {
      entidadeId: entidade.id,
      telefone: '999999999',
      subAccountId: subAccount.id,
      estado: 'ACTIVO',
      countryId: angolaId.id,
    },
  })
  console.log('Fornecedor consumidor diferenciado seeded!')
}
