import { prisma } from '@/lib/prisma'

export async function getRolePermissionsModel(id: number) {
  const permissions = await prisma.$queryRaw`
  SELECT id, slug, description FROM permissions 
  WHERE id IN (
    SELECT permission_id
    FROM role_permissions 
    WHERE role_id = ${id}
  )
`
  return permissions
}
