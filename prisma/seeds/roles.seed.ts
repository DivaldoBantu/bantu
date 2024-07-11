import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

const testePermissions = [
  'create role',
  'delete role',
  'update role',
  'list role',
  'read role',

  'create empresa',
  'delete empresa',
  'update empresa',
  'list empresa',
  'read empresa',

  'create user',
  'delete user',
  'update user',
  'list user',
  'read user',

  'create fornecedor',
  'delete fornecedor',
  'update fornecedor',
  'list fornecedor',
  'read fornecedor',

  'create carreira',
  'delete carreira',
  'read carreira',
  'list carreira',
  'update carreira',

  'create cliente',
  'delete cliente',
  'update cliente',
  'list cliente',
  'read cliente',

  'list permissions',

  'create unidade',
  'delete unidade',
  'update unidade',
  'list unidade',
  'read unidade',

  'create category',
  'delete category',
  'update category',
  'list category',
  'read category',

  'create subcategory',
  'delete subcategory',
  'update subcategory',
  'list subcategory',
  'read subcategory',

  'create loja',
  'delete loja',
  'update loja',
  'list loja',
  'read loja',

  'create armazem',
  'delete armazem',
  'update armazem',
  'list armazem',
  'read armazem',
]

export async function seedRolePermissions() {
  const permis = await prisma.permission.count()

  if (permis > 0) {
    console.log('Permissions already seeded')
    return
  }

  await CreateRolePermission({
    name: 'teste',
    permissions: testePermissions,
  })
}

async function CreateRolePermission({
  permissions,
  name,
}: {
  permissions: string[]
  name: string
}) {
  // create role
  const role = await prisma.role.create({
    data: {
      name,
    },
  })

  // create permissions
  for (const per of permissions) {
    const { id } = await createPermission(per)
    await prisma.rolePermission.create({
      data: {
        roleId: role.id,
        permissionId: id,
      },
    })
  }
}

async function createPermission(per: string) {
  return await prisma.permission.create({
    data: {
      slug: createSlug(per),
      description: per,
    },
    select: {
      id: true,
    },
  })
}
